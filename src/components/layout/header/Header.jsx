import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { getLoggedSeller, logout } from "../../../core/services/AuthService";

export const Header = () => {

  const [loggedSeller, setLoggedSeller] = useState(false);

  const onLogout = () => {
    logout();
    setLoggedSeller(false);
  }

  useEffect(() => {
    const seller = getLoggedSeller();
    
    seller ? setLoggedSeller(true) : setLoggedSeller(false);
    // if (seller) {
    //   setLoggedSeller(true);
    // } else {
    //   setLoggedSeller(false);
    // }
  }, [])

  const seller = getLoggedSeller();


  return (
    
    <Navbar bg="dark" variant="dark" expand="md">
      <Navbar.Brand>
        <img
          alt=""
          // src="./logo-bag.png"
          src="https://image.flaticon.com/icons/png/512/2258/2258432.png"
          width="52"
          height="52"
          className="d-inline-block align-center ml-2 mr-2"
        />{" "}
        eDay
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/sales">
            Sales
          </Nav.Link>
          <Nav.Link as={Link} to="/sellers">
            Sellers
          </Nav.Link>
          <Nav.Link as={Link} to="/sell">
            Sell Item
          </Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form>
        {console.log(seller)}
        {!seller ? (
          <Nav.Link className="text-warning" as={Link} to="/login">
            Login
          </Nav.Link>
        ) : (
          <Nav.Link className="text-danger" as={Link} to="/sales" onClick={onLogout}>
            Logout
          </Nav.Link>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};
