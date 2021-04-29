import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Store from "./pages/store/Store";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Store} />
      </Switch>
    </Router>
  );
};

export default Routes;
