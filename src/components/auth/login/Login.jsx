import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Link from "react-bootstrap/NavLink";
import { login } from "../../../core/services/AuthService";
import { Redirect } from "react-router-dom";

export const Login = () => {
  const [sellerData, setSellerData] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const onInputChange = (event) => {
    event.persist();

    setSellerData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    login(sellerData)
      .then((_) => {
        setRedirect(true);
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
    { redirect && <Redirect to="/sales" /> }
      <Container className="my-4">
        <Form onSubmit={onFormSubmit}>
          {/* Email */}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={onInputChange}
            />
          </Form.Group>

          {/* Password */}
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onChange={onInputChange}
            />
          </Form.Group>

          {/* Submit */}
          <Row className="text-center">
            <Col>
              <Button type="submit" className="mb-3">
                Login
              </Button>
            </Col>
          </Row>

          <Form.Group
            className="mb-3 text-center"
            controlId="formBasicRegistration"
          >
            <Form.Label>Don't have an account yet?</Form.Label> <br />
            <Form.Label>
              <Nav.Link as={Link} to="/register">
                Register
              </Nav.Link>{" "}
              here.
            </Form.Label>
          </Form.Group>
        </Form>
      </Container>
    </>
  );
};
