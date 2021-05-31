import React from "react";
import { Route, Switch } from "react-router";
import { Sellers } from "../../Sellers";

export const Main = () => {
  return (
    <Switch>
        <Route exact path="/sellers" component={Sellers}/>
    </Switch>
  );
};
