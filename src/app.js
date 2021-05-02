import { Route, BrowserRouter } from "react-router-dom";
import { UserAuth } from "./hooks/auth";
import { Authcontext } from "./context/auth-context";
import Components from "views/Components/Components.js";
import LandingPage from "views/LandingPage/LandingPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import React from "react";
import SignupPage from "views/signupPage/signupPage";
import ListEnfant from "views/listEnfants.js/listEnfant";

function App() {
  const { userId, token, login, logout } = UserAuth();

  let routes;
  if (token) {
    routes = (
      <React.Fragment>
        <Route path="/landing-page" component={LandingPage} />
        <Route path="/profile-page" component={ProfilePage} />
        <Route path="/liste-enfants" component={ListEnfant} />
        <Route path="/" exact component={Components} />
      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        <Route path="/landing-page" component={LandingPage} />
        <Route path="/login-page" component={LoginPage} />
        <Route path="/signup-page" component={SignupPage} />
        <Route path="/" exact component={Components} />
      </React.Fragment>
    );
  }
  return (
    <Authcontext.Provider
      value={{ userId: userId, token: token, login: login, logout: logout }}
    >
      <BrowserRouter>{routes}</BrowserRouter>
    </Authcontext.Provider>
  );
}

export default App;
