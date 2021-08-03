import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import MainAppContainer from "./containers/MainAppContainer";
import "./stylesheets/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <Router>
      <Route path="/login" component={Login} />
      <Route exact={true} path="/">
<<<<<<< HEAD
        <MainAppContainer />
=======
      {/* <ProtectedRoute exact={true} path="/"> */}
        <MainAppContainer />
        {/* </ProtectedRoute */}
>>>>>>> 43fcf343300fdacc45987578d182b6cd59af6fd7
      </Route>
    </Router>
  );
};

export default App;
