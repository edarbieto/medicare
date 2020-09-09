import React from "react";
import Login from "./Login";
import Main from "./Main";
import { BrowserRouter, Switch, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
