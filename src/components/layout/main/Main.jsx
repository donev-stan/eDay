import React from "react";
import { Route, Switch } from "react-router";
import { Sellers } from "../../seller/Sellers";
import { Seller } from "../../seller/Seller";

export const Main = () => {
  return (
    <Switch>
        <Route exact path="/sellers" component={Sellers}/>
        <Route exact path="/seller/:id" component={Seller}/>
    </Switch>
  );
};
