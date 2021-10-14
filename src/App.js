import { Route, Switch } from "react-router-dom";
import "./App.css";
import Gallery from "./components/Gallery";
import Home from "./components/Home";
import Pokemon from "./components/Pokemon";

function App() {
  return (
    <Switch>
      <Route exact path="/" render={(props) => <Home {...props} />} />
      <Route exact path="/Gallery" render={(props) => <Gallery {...props} />} />
      <Route
        exact
        path="/:pokemonId"
        render={(props) => <Pokemon {...props} />}
      />
    </Switch>
  );
}

export default App;
