import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
import { login, getLoggedSeller } from "../../../core/services/AuthService";
import { Redirect, Link } from "react-router-dom";

export const Login = () => {
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
      [event.target.name]: event.target.value.trim(),
    }));
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    login(sellerData)
      .then((_) => {
        setRedirect(true);
      })
      .catch((error) => setError(error.message));
  };

  return (
    <>
      {redirect && <Redirect to="/" />}
      <Container className="my-4">
        {error && (
          <Alert key={3} variant={"danger"} className="text-center">
            {error}
          </Alert>
        )}

        <Form onSubmit={onFormSubmit}>
          {/* Email */}
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              autoComplete="on"
              onChange={onInputChange}
            />
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
            className="my-4 text-center"
          >
            <Form.Label>Don't have an account yet?</Form.Label> <br />
            <Container
              className="justify-content-center my-2"
              style={{ width: "80%" }}
            >
              <Row>
                <Col>
                  <Image
                    src="https://image.flaticon.com/icons/png/512/2921/2921112.png"
                    style={imgStyles}
                    rounded
                  />
                </Col>

                <Col>
                  <Card.Link as={Link} to={`/register`}>
                    <Button variant="success" className="mt-2">
                      Register
                    </Button>
                  </Card.Link>
                </Col>

                <Col>
                  <Image
                    src="https://image.flaticon.com/icons/png/512/3456/3456426.png"
                    style={imgStyles}
                    rounded
                  />
                </Col>
              </Row>
            </Container>
          </Form.Group>
        </Form>
      </Container>
    </>
  );
};

const imgStyles = {
  width: "80px",
  height: "80px",
};
