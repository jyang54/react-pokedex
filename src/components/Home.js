import React from "react";
import Pokedex from "./Pokedex";

function Home(props) {
  return (
    <>
      <Pokedex {...props} />
    </>
  );
}

export default Home;
