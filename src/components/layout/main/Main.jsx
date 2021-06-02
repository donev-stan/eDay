import React from "react";
import { Route, Switch } from "react-router";
import { Sellers } from "../../sellers/Sellers";
import { Seller } from "../../sellers/Seller";
import { Login } from "../../auth/login/Login";
import { Register } from "../../auth/register/Register";
import { AuthorizedRoute } from "../../../core/guards/AuthorizedRoute";
import { Sales } from "../../sales/Sales";

export const Main = () => {
  return (
    <Switch>
        <Route exact path="/sales" component={Sales} />
        <Route exact path="/sellers" component={Sellers}/>
        <Route exact path="/seller/:id" component={Seller}/>
        {/* <AuthorizedRoute exact path="/sell" component={SellItem} /> */}
        <Route exact path="/login" component={Login}/>
        <Route exact path="/register" component={Register}/>
    </Switch>
  );
};
