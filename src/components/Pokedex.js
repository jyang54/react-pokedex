import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  LinearProgress,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import Header from "./Header";

const toTitleCase = (name) => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

const useStyles = makeStyles(() => ({
  pokeContainer: {
    paddingTop: "30px",
    paddingLeft: "10%",
    paddingRight: "10%",
  },
  pokemonPic: {
    margin: "auto",
  },
  pokeContent: {
    textAlign: "center",
  },
}));

const Pokedex = (props) => {
  const { history } = props;
  const classes = useStyles();
  const [allPokemons, setAllPokemons] = useState([]);
  const [filter, setFilter] = useState("");
  const [sortProperty, setSortProperty] = useState("ID");
  const [sortOrder, setSortOrder] = useState("ASC");
  const [hasLoaded, setHasLoaded] = useState(false);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const types = [
    "all types",
    "normal",
    "fire",
    "water",
    "grass",
    "flying",
    "fighting",
    "poison",
    "electric",
    "ground",
    "rock",
    "psychic",
    "ice",
    "bug",
    "ghost",
    "steel",
    "dragon",
    "dark",
    "fairy",
  ];

  const getAllPokemonData = async (result) => {
    const pokemonArr = [];

    await Promise.all(
      result.map((pokemonItem) => {
        return axios
          .get(`https://pokeapi.co/api/v2/pokemon/${pokemonItem.name}`)
          .then((result) => {
            pokemonArr[result.data.id] = {
              id: result.data.id,
              name: result.data.name,
              types: result.data.types,
              sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${result.data.id}.png`,
            };
          });
      })
    );
    setAllPokemons(pokemonArr);
    //console.log(allPokemons);
    //allPokemons.map((pokemon) => console.log(pokemon.types));
    setHasLoaded(true);
  };

  const getAllPokemonIds = async () => {
    const response = await axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=${1000}`)
      .catch((err) => console.log("Error:", err));
    getAllPokemonData(response.data.results);
  };

  useEffect(() => {
    getAllPokemonIds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sortStateByName = (asc) => {
    let sortedFilteredArray = filteredPokemons;
    let sortedAllArray = allPokemons;
    if (asc) {
      sortedFilteredArray.sort((a, b) => a.name.localeCompare(b.name));
      sortedAllArray.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      sortedFilteredArray.sort((a, b) => b.name.localeCompare(a.name));
      sortedAllArray.sort((a, b) => b.name.localeCompare(a.name));
    }
    setFilteredPokemons(sortedFilteredArray);
    setAllPokemons(sortedAllArray);
  };

  const sortStateByID = (asc) => {
    let sortedFilteredArray = filteredPokemons;
    let sortedAllArray = allPokemons;
    if (asc) {
      sortedFilteredArray.sort((a, b) => a.id - b.id);
      sortedAllArray.sort((a, b) => a.id - b.id);
    } else {
      sortedFilteredArray.sort((a, b) => b.id - a.id);
      sortedAllArray.sort((a, b) => b.id - a.id);
    }
    setFilteredPokemons(sortedFilteredArray);
    setAllPokemons(sortedAllArray);
  };

  const handleSearchChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSortProperty = (e) => {
    setSortProperty(e.target.value);
    if (e.target.value === "Name") {
      sortStateByName(sortOrder === "ASC" ? true : false);
    } else {
      sortStateByID(sortOrder === "ASC" ? true : false);
    }
  };

  const handleSortOrder = (e) => {
    setSortOrder(e.target.value);
    if (sortProperty === "Name") {
      sortStateByName(e.target.value === "ASC" ? true : false);
    } else {
      sortStateByID(e.target.value === "ASC" ? true : false);
    }
  };

  const handleTypeChange = (e) => {
    if (e.target.value === "all types") {
      setIsFiltered(false);
      return;
    }
    let filterArr = [];

    Object.keys(allPokemons).map((i) => {
      for (let j = 0; j < allPokemons[i].types.length; j++) {
        if (e.target.value === allPokemons[i].types[j].type.name) {
          filterArr.push(allPokemons[i]);
        }
      }
      return;
    });

    setFilteredPokemons(filterArr);
    setIsFiltered(true);
  };

  const getPokemonCard = (pokemonId, pokemonArray) => {
    const { id, name, sprite } = pokemonArray[pokemonId];
    return (
      <Grid item xs={props.isGallery ? 2 : 12} key={pokemonId}>
        <Card onClick={() => history.push(`/${id}`)}>
          <CardMedia
            className={classes.pokemonPic}
            image={sprite}
            style={{ width: "100px", height: "100px" }}
          />
          <CardContent className={classes.pokeContent}>
            <Typography>{`${id}. ${toTitleCase(name)}`}</Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  return hasLoaded ? (
    <>
      <Header
        onSearchChange={handleSearchChange}
        onSortProperty={handleSortProperty}
        onSortOrder={handleSortOrder}
        types={types}
        onTypeSelect={handleTypeChange}
        {...props}
      />
      <Grid container spacing={1} className={classes.pokeContainer}>
        {isFiltered
          ? Object.keys(filteredPokemons).map(
              (pokemonId) =>
                filteredPokemons[pokemonId].name.includes(filter) &&
                getPokemonCard(pokemonId, filteredPokemons)
            )
          : Object.keys(allPokemons).map(
              (pokemonId) =>
                allPokemons[pokemonId].name.includes(filter) &&
                getPokemonCard(pokemonId, allPokemons)
            )}
      </Grid>
    </>
  ) : (
    <LinearProgress />
  );
};

Pokedex.propTypes = {
  isGallery: PropTypes.bool,
};

export default Pokedex;
