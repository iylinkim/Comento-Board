import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Detail from "../routes/Detail";
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
        <Route exact path="/:id" >
            <Detail api={api} />
        </Route>
      </Switch>
    </Router>
  );
};
export default AppRouter;
