import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../routes/Home";
import Header from "./Header";

const AppRouter = ({ api }) => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home api={api} />
        </Route>
      </Switch>
    </Router>
  );
};
export default AppRouter;
