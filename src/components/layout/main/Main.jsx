import React from "react";
import { Route, Switch } from "react-router";
import { Sellers } from "../../seller/Sellers";

export const Main = () => {
  return (
    <Switch>
        <Route exact path="/sellers" component={Sellers}/>
    </Switch>
  );
};
