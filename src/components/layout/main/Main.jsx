import React from "react";
import { Route, Switch } from "react-router";
import { Sellers } from "../../sellers/Sellers";
import { Seller } from "../../sellers/Seller";
import { Login } from "../../auth/login/Login";
import { Register } from "../../auth/register/Register";
import { AuthorizedRoute } from "../../../core/guards/AuthorizedRoute";
import { Sales } from "../../sales/Sales";
import { Sale } from "../../sales/Sale";
import { SellItem } from "../../sell/SellItem";
import { Home } from "../../home/Home";

export const Main = () => {
  return (
    <Switch>
        <Route exact path="/sales" component={Sales} />
        <AuthorizedRoute exact path="/sales/:id" component={Sale}/>
        <AuthorizedRoute exact path="/sales/edit/:id" component={SellItem}/>
        
        <Route exact path="/sellers" component={Sellers}/>
        <AuthorizedRoute exact path="/sellers/:id" component={Seller}/>
        <Route exact path="/sellers/edit/:id" component={Register}/>
        
        <AuthorizedRoute exact path="/sell" component={SellItem} />

        <AuthorizedRoute exact path="/profile" component={Seller} />

        <Route exact path="/login" component={Login}/>
        <Route exact path="/register" component={Register}/>

        <Route exact path="/" component={Home} />
    </Switch>
  );
};
