import React from "react";
import Pokedex from "./Pokedex";

class Gallery extends React.Component {
  render() {
    return <Pokedex isGallery={true} {...this.props} />;
  }
}

export default Gallery;
