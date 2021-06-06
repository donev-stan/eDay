import React from "react";
import { Route, Switch } from "react-router";
import { AuthorizedRoute } from "../../../core/guards/AuthorizedRoute";

import { Login } from "../../auth/login/Login";
import { Register } from "../../auth/register/Register";

import { Seller } from "../../sellers/Seller";
import { Sellers } from "../../sellers/Sellers";

import { Sale } from "../../sales/Sale";
import { Sales } from "../../sales/Sales";
import { SaleCreate } from '../../sales/SaleCreate';
import { SaleEdit } from '../../sales/SaleEdit';


export const Main = () => {

  return (
    <Switch>
        <Route exact path="/" component={Sales} />
        <Route exact path="/sales" component={Sales} />

        <AuthorizedRoute exact path="/sales/create" component={SaleCreate} />
        <AuthorizedRoute exact path="/sales/:id" component={Sale} />
        <AuthorizedRoute exact path="/sales/edit/:id" component={SaleEdit} />

        <Route exact path="/sellers" component={Sellers}/>
        <AuthorizedRoute exact path="/sellers/:id" component={Seller}/>
        {/* <AuthorizedRoute exact path="/sellers/edit/:id" component={SellerEdit}/> */}

        <Route exact path="/sellers/edit/:id" component={Register}/>

        <AuthorizedRoute exact path="/profile" component={Seller} />

        <Route exact path="/login" component={Login}/>
        <Route exact path="/register" component={Register}/>
    </Switch>
  );
};
