import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { getLoggedSeller, login } from "../../../core/services/AuthService";
import { Redirect } from "react-router";
import {
  saveSeller,
  getSellerByID,
} from "../../../core/services/SellerService";

export const Register = (props) => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bio: "",
    password: "",
    rating: 0,
    // address: {
    //   city: "",
    //   zip: "",
    // },
  });
  const [redirect, setRedirect] = useState(false);
  const [redirectPath, setRedirectPath] = useState("/sales");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (props.match.params.id) {
      getSellerByID(props.match.params.id)
        .then((response) => {
          setUserData(response.data);
          // setRedirectPath(`/sellers/${props.match.params.id}`);
          setRedirectPath(`/sellers`);
        })
        .then((_) => {
          const loggedSeller = getLoggedSeller();

          if (!loggedSeller || loggedSeller.id !== userData.id) {
            setRedirectPath("/sellers");
            setRedirect(true);
          }
        });
    }
  }, [props.match.params.id, userData.id]);

  const onInputChange = (event) => {
    event.persist();

    setUserData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    saveSeller(userData)
      .then((_) => {
        setRedirect(true);
        login(userData);
      })
      .catch((error) => setError(error.message));
  };

  return (
    <>
      {redirect && <Redirect to={redirectPath} />}
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
              value={userData.picture}
            />
          </Form.Group>
          {/* <Form.Group className="my-2 mb-4">
            <Form.Label>Avatar</Form.Label>
            <select
              name="avatar"
              className="form-control"
              onChange={onInputChange}
            >
              <option value="/">None. I used my own image!</option>
              <option value="/set_set1">Robot</option>
              <option value="/set_set2">Monster</option>
              <option value="/set_set3">Robot Head</option>
              <option value="/set_set4">Cat</option>
              <option value="/set_sete5">Human (*Image Loads slower*. Humans take more time to compute)</option>
            </select>
          </Form.Group> */}

          {/* Name*/}
          <Row className="my-3">
            {/* <Form.Label>Names</Form.Label> */}
            <Col>
              <Form.Control
                placeholder="First name"
                name="firstName"
                onChange={onInputChange}
                value={userData.firstName}
                required
              />
            </Col>
            <Col>
              <Form.Control
                placeholder="Last name"
                name="lastName"
                onChange={onInputChange}
                value={userData.lastName}
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
              value={userData.bio}
            />
          </Form.Group>

          {/* Address */}
          <Row className="mb-3">
            <Col xs={7}>
              <Form.Control
                placeholder="City"
                name="city"
                onChange={onInputChange}
                value={userData.city}
              />
            </Col>
            <Col>
              <Form.Control
                placeholder="Zip"
                name="zip"
                onChange={onInputChange}
                value={userData.zip}
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
              value={userData.phone}
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
              value={userData.email}
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
              value={userData.password}
              required
            />
          </Form.Group>

          {/* Submit */}
          <Row className="text-center">
            <Col>
              <Button type="submit" className="mb-3">
                Save User
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
};
