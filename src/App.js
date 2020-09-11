import React from "react";
import Login from "./views/Login";
import Dashboard from "./views/Dashboard";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import AuthService from "./services/AuthService";

const DashboardRoute = ({ ...routeProps }) => (
  <Route
    {...routeProps}
    render={(props) =>
      AuthService.getUser() && AuthService.isTokenValid() ? (
        <Dashboard {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

const LoginRoute = ({ ...routeProps }) => (
  <Route
    {...routeProps}
    render={(props) =>
      !AuthService.getUser() || !AuthService.isTokenValid() ? (
        <Login {...props} />
      ) : (
        <Redirect to="/dashboard" />
      )
    }
  />
);

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <LoginRoute path="/login" />
        <DashboardRoute path="/dashboard" />
      </Switch>
    </BrowserRouter>
  );
}
