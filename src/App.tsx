import * as React from "react";
import { Route, Router } from "react-router-dom";
import AuthCallback from "./AuthCallback";
import history from "./history";
import Home from "./Home";
import Navigation from "./Navigation";

import "./App.css";

export default class App extends React.Component {
  public render() {
    return (
      <Router history={history}>
        <div>
          <Navigation />
          <Route exact={true} path={"/"} component={Home} />
          <Route path={"/auth/callback"} component={AuthCallback} />
        </div>
      </Router>
    );
  }
}
