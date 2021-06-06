import React, { useState, useEffect } from "react";
import { getLoggedSeller, login } from "../../core/services/AuthService";
import { Redirect } from "react-router";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { saveSeller } from "../../core/services/SellerService";

export const SellerEdit = (props) => {
  const [sellerData, setSellerData] = useState({});
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const seller = getLoggedSeller();

    // If a try to edit another user
    if (props.computedMatch.params.id !== seller.id.toString()) {
      setError(
        `You tried to access different user's data so you were redirected to edit your own profile :)`
      );
    }

    console.log(seller);
    seller.city = seller.address.city;
    seller.zip = seller.address.zip;

    setSellerData(seller);
  }, [props.computedMatch.params.id]);

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
      {redirect && <Redirect to="/sellers" />}
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
              onChange={onInputChange}
              value={sellerData.picture}
            />
          </Form.Group>

          {/* Name*/}
          <Row className="my-3">
            {/* <Form.Label>Names</Form.Label> */}
            <Col>
              <Form.Control
                placeholder="First name"
                name="firstName"
                onChange={onInputChange}
                value={sellerData.firstName}
                required
              />
            </Col>
            <Col>
              <Form.Control
                placeholder="Last name"
                name="lastName"
                onChange={onInputChange}
                value={sellerData.lastName}
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
              value={sellerData.bio}
            />
          </Form.Group>

          {/* Address */}
          <Row className="mb-3">
            <Col xs={7}>
              <Form.Control
                placeholder="City"
                name="city"
                onChange={onInputChange}
                value={sellerData.city}
              />
            </Col>
            <Col>
              <Form.Control
                placeholder="Zip"
                name="zip"
                onChange={onInputChange}
                value={sellerData.zip}
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
              value={sellerData.phone}
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
              value={sellerData.email}
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
              value={sellerData.password}
              required
            />
          </Form.Group>

          {/* Submit */}
          <Row className="text-center">
            <Col>
              <Button type="submit" className="mb-3">
                Update User Profile
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
};
