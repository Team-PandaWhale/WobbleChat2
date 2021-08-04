import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import auth from "./Auth";

const Login = (props) => {
  const [userData, setUserData] = useState({ username: "", password: "" });
  const history = useHistory();

  const handleUsernameInputChange = (e) => {
    e.persist();
    setUserData((userData) => ({
      ...userData,
      username: e.target.value,
    }));
  };

  const handlePasswordInputChange = (e) => {
    e.persist();
    setUserData((userData) => ({
      ...userData,
      password: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userData);
    fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userData.username,
        password: userData.password,
      }),
    })
      .then((response) => {
        console.log(
          "we have successfully made a post request with the user data",
          response
        );
        history.push("/");
      })
      .catch((err) => {
        console.log("Error making fetch request", err);
      });
    history.push("/");
  };

  return (
    <div>
      <h1>Welcome, please log in.</h1>
      <form onSubmit={handleSubmit}>
        <input
          id="username"
          className="form-field"
          type="text"
          name="username"
          value={userData.username}
          onChange={handleUsernameInputChange}
        />
        <input
          id="username"
          className="form-field"
          type="text"
          name="username"
          value={userData.password}
          onChange={handlePasswordInputChange}
        />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
};

export default Login;
