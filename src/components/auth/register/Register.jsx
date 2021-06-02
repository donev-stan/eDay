import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { register } from "../../../core/services/AuthService";
import { Redirect } from "react-router";

export const Register = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bio: "",
    password: "",
    rating: 0,
    address: {
      city: "",
      zip: ""
    },
    redirect: false,
  });

  const onInputChange = (event) => {
    event.persist();

    setUserData((prevState) => ({
        ...prevState,
      [event.target.name]: event.target.value.trim(),
    }));
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const { redirect, ...userDataNeeded } = userData;

    register(userDataNeeded)
      .then(_ => {
        setUserData({
          redirect: true,
        });
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      {userData.redirect && <Redirect to="/login" />}
      <Container className="my-4">
        <Form onSubmit={onFormSubmit}>
          {/* Name*/}
          <Row className="mb-3">
            <Col>
              <Form.Control
                placeholder="First name"
                name="firstName"
                onChange={onInputChange}
                required
              />
            </Col>
            <Col>
              <Form.Control
                placeholder="Last name"
                name="lastName"
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
              onChange={onInputChange}
            />
          </Form.Group>

          {/* Address */}
          <Row className="mb-3">
            <Col xs={7}>
              <Form.Control
                placeholder="City"
                name="city"
                onChange={onInputChange}
              />
            </Col>
            <Col>
              <Form.Control
                placeholder="Zip"
                name="zip"
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
              onChange={onInputChange}
              required
            />
          </Form.Group>

          {/* Submit */}
          <Row className="text-center">
            <Col>
              <Button type="submit" className="mb-3">
                Register me
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
};
