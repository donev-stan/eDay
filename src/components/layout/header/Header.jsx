import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { Link, withRouter } from "react-router-dom";

const Header = withRouter((props) => {
  const [searchParam, setSeachParam] = useState("");

  const onFormSubmit = (event) => {
    event.preventDefault();

    const pathName = props.location.pathname.split("/")[1];

    const historyObject = { pathName: `/${pathName}` };

    if (searchParam) {
      historyObject.search = `?q=${searchParam}`;
    }

    props.history.push(historyObject);
  };

  const onSearchInputChange = (event) => {
    // event.persist();
    setSeachParam(event.target.value);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Navbar.Brand>
        <img
          alt=""
          // src="./logo-bag.png"
          src="https://image.flaticon.com/icons/png/512/2984/2984530.png"
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
        <Form inline onSubmit={onFormSubmit}>
          <FormControl
            type="text"
            placeholder="Search"
            className="mr-sm-2"
            onChange={onSearchInputChange}
          />
          <Button variant="outline-success" type="submit">
            Search
          </Button>
        </Form>
        <Nav.Link className="text-warning" as={Link} to="/profile">
          Profile
        </Nav.Link>
      </Navbar.Collapse>
    </Navbar>
  );
});

export default Header;
