import {
  AppBar,
  Grid,
  InputLabel,
  makeStyles,
  Select,
  TextField,
  Toolbar,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { Button, FormControl, MenuItem } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(2),
  },
  searchGroup: {
    display: "flex",
    paddingLeft: "30px",
    marginTop: "5px",
    marginBottom: "5px",
  },
  searchIcon: {
    alignSelf: "flex-end",
    marginBottom: "8px",
  },
  searchInput: {
    width: "500px",
    margin: "5px",
  },
  navMenu: {
    marginTop: "10px",
  },
  navButtonGroup: {
    marginTop: "10px",
    paddingBottom: "5px",
  },
  navButton: {
    right: "5px",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

function Header(props) {
  const classes = useStyles();
  const { history } = props;
  return (
    <AppBar position="static" color="secondary">
      <Toolbar>
        <Grid container justifyContent="space-between">
          <Grid item className={classes.searchGroup}>
            <SearchIcon className={classes.searchIcon} />
            <TextField
              className={classes.searchInput}
              onChange={props.onSearchChange}
              label="Please type in Pokemon"
              variant="standard"
            />
          </Grid>

          <Grid item className={classes.navMenu}>
            <FormControl>
              <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Sort By"
                onChange={props.onSortProperty}
                className={classes.menuButton}
              >
                <MenuItem value={"Name"}>Name</MenuItem>
                <MenuItem value={"ID"}>Id</MenuItem>
              </Select>
            </FormControl>

            <FormControl>
              <InputLabel id="demo-simple-select-label">ASC</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="ASC"
                onChange={props.onSortOrder}
                className={classes.menuButton}
              >
                <MenuItem value={"ASC"}>ASC</MenuItem>
                <MenuItem value={"DESC"}>DESC</MenuItem>
              </Select>
            </FormControl>

            <FormControl>
              <InputLabel id="demo-simple-select-label">Types</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="ASC"
                onChange={props.onTypeSelect}
                autoWidth
                className={classes.menuButton}
              >
                {props.types.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item className={classes.navButtonGroup}>
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => history.push("/")}
              className={classes.navButton}
            >
              Home
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => history.push("/Gallery")}
            >
              Gallery
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  onSearchChange: PropTypes.func,
  onSortProperty: PropTypes.func,
  onSortOrder: PropTypes.func,
  onSort: PropTypes.func,
  types: PropTypes.array,
  onTypeSelect: PropTypes.func,
};

export default Header;
