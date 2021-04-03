import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Detail from "../routes/Detail";
import Home from "../routes/Home";
import Header from "./Header";
import styles from "style/router.module.css"

const AppRouter = ({ api }) => {
  return (
    <Router>
      <Header />
      <Switch>
        <div className={styles.wrap}>
          <Route exact path="/">
            <Home api={api} />
          </Route>
          <Route exact path="/:id">
            <Detail api={api} />
          </Route>
        </div>
      </Switch>
    </Router>
  );
};
export default AppRouter;
