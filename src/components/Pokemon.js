import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  LinearProgress,
  makeStyles,
  Card,
  Grid,
} from "@material-ui/core";
import axios from "axios";

const toTitleCase = (name) => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

const useStyles = makeStyles({
  pokemonInfoGrid: {
    margin: "auto",
    textAlign: "center",
    height: "650px",
  },
  pokemonInfoCard: {
    height: "100%",
    //paddingBottom: "0px",
  },
  prevButton: {
    position: "absolute",
    top: "50%",
    left: "10%",
  },
  nextButton: {
    position: "absolute",
    top: "50%",
    right: "10%",
  },
  backButton: {
    marginTop: "10px",
    display: "block",
    margin: "auto",
  },
  warning: {
    textAlign: "center",
  },
});

const Pokemon = (props) => {
  const { history } = props;
  const { match } = props;
  const { params } = match;
  const { pokemonId } = params;
  const [pokemon, setPokemon] = useState(undefined);
  const classes = useStyles();

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      .then((response) => {
        const { data } = response;
        setPokemon(data);
      })
      .catch((error) => {
        setPokemon(false);
      });
  }, [pokemonId]);

  const generatePokemonDetail = () => {
    const { id, name, species, types, height, weight } = pokemon;
    const imageURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    return (
      <Grid
        container
        className={classes.pokemonInfoGrid}
        justifyContent="center"
        alighItems="center"
      >
        <Grid item xs={10}>
          <Card className={classes.pokemonInfoCard}>
            <img
              style={{ width: "300px", height: "300px" }}
              src={imageURL}
              alt={name}
            />
            <Typography
              variant="h2"
              style={{ marginLeft: "10%", marginRight: "10%" }}
            >
              {`${id}.`} {toTitleCase(name)}
            </Typography>
            <br></br>
            <Typography variant="h5">Pokemon Info</Typography>
            <Typography>
              {"Species: "} {species.name}
            </Typography>
            <Typography>Height: {height} </Typography>
            <Typography>Weight: {weight} </Typography>
            <br></br>
            <Typography variant="h6"> Types:</Typography>
            {types.map((typeInfo) => {
              return (
                <Typography key={typeInfo.type.name}>
                  {" "}
                  {`${typeInfo.type.name}`}
                </Typography>
              );
            })}
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => history.push(id === 10001 ? "/898" : `/${id - 1}`)}
              className={classes.prevButton}
            >
              Prev
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => history.push(id === 898 ? "/10001" : `/${id + 1}`)}
              className={classes.nextButton}
            >
              Next
            </Button>
          </Card>
        </Grid>
      </Grid>
    );
  };

  return (
    <>
      {pokemon === undefined && <LinearProgress />}
      {pokemon !== undefined && pokemon && generatePokemonDetail(pokemon)}
      {pokemon === false && (
        <Typography variant="h2" className={classes.warning}>
          No such Pokemon
        </Typography>
      )}

      {pokemon !== undefined && (
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => history.push("/")}
          className={classes.backButton}
        >
          Go Back
        </Button>
      )}
    </>
  );
};

export default Pokemon;
