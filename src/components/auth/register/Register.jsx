import React, { useState, useEffect } from "react";
import { getLoggedSeller, login } from "../../../core/services/AuthService";
import { Redirect } from "react-router";
import { saveSeller } from "../../../core/services/SellerService";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

export const Register = () => {
  const [sellerData, setSellerData] = useState({});
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (getLoggedSeller()) setRedirect(true);
  }, []);

  const onInputChange = (event) => {
    event.persist();

    setSellerData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    saveSeller(sellerData)
      .then((_) => {
        setRedirect(true);
        login(sellerData);
      })
      .catch((error) => setError(error.message));
  };

  return (
    <>
      {redirect && <Redirect to="/" />}
      <Container className="my-4">
        <Form onSubmit={onFormSubmit}>
          {error && (
            <Alert key={3} variant={"danger"} className="text-center">
              {error}
            </Alert>
          )}

          {/* Image */}
          <Form.Group className="my-2">
            <Form.Label>Image</Form.Label>
            <Form.Control
              placeholder="Place image link or leave blank for randomly generated avatar (takes while to load at first)"
              className="my-1"
              name="picture"
              autoComplete="on"
              onChange={onInputChange}
            />
          </Form.Group>

          {/* Name*/}
          <Row className="my-3">
            {/* <Form.Label>Names</Form.Label> */}
            <Col>
              <Form.Control
                placeholder="First name"
                name="firstName"
                autoComplete="on"
                onChange={onInputChange}
                required
              />
            </Col>
            <Col>
              <Form.Control
                placeholder="Last name"
                name="lastName"
                autoComplete="on"
                onChange={onInputChange}
                required
              />
            </Col>
          </Row>

          {/* Bio */}
          <Form.Group className="mb-3">
            <Form.Label>Bio</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="bio"
              autoComplete="on"
              onChange={onInputChange}
            />
          </Form.Group>

          {/* Address */}
          <Row className="mb-3">
            <Col xs={7}>
              <Form.Control
                placeholder="City"
                name="city"
                autoComplete="on"
                onChange={onInputChange}
              />
            </Col>
            <Col>
              <Form.Control
                placeholder="Zip"
                name="zip"
                autoComplete="on"
                onChange={onInputChange}
              />
            </Col>
          </Row>

          {/* Phone */}
          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              placeholder="Phone number"
              name="phone"
              autoComplete="on"
              onChange={onInputChange}
              required
            />
          </Form.Group>

          {/* Email */}
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              autoComplete="on"
              onChange={onInputChange}
              required
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          {/* Password */}
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              autoComplete="on"
              onChange={onInputChange}
              required
            />
          </Form.Group>

          {/* Submit */}
          <Row className="text-center">
            <Col>
              <Button type="submit" className="mb-3">
                Register
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
};
