import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Navbar.Brand>
        <img
          alt=""
          src="./logo-bag.png"
          width="42"
          height="42"
          className="d-inline-block align-center mb-2"
        />{" "}
        eDay
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
            <Nav.Link as={Link} to="/sales">Sales</Nav.Link>
            <Nav.Link as={Link} to="/sellers">Sellers</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};
