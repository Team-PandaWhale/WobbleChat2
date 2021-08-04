import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Signup from "./Signup";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import MainAppContainer from "./containers/MainAppContainer";
import "./stylesheets/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <Router>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <ProtectedRoute exact={true} path="/">
        <MainAppContainer />
      </ProtectedRoute>
    </Router>
  );
};

export default App;

/*
<Router>
<Route exact path="/login">
  <Login />
</Route>
<Route exact={true} path="/">
  <ProtectedRoute exact={true} path="/">
  <MainAppContainer />
  </ProtectedRoute />
</Route>
</Router>


*/
