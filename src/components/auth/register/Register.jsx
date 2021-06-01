import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export const Register = () => {

    const onInputChange = (event) => {

    };

    const onFormSubmit = () => {

    };

  return (
    <Container className="my-4">
      <Form onSubmit={onFormSubmit}>
        {/* Name*/}
        <Row className="mb-3">
          <Col>
            <Form.Control placeholder="First name" name="firstName" onInputChange={onInputChange} required/>
          </Col>
          <Col>
            <Form.Control placeholder="Last name" name="lastName" onInputChange={onInputChange} required/>
          </Col>
        </Row>

        {/* Bio */}
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Bio</Form.Label>
          <Form.Control as="textarea" rows={3} name="bio" onInputChange={onInputChange} />
        </Form.Group>

        {/* Address */}
        <Row className="mb-3">
          <Col xs={7}>
            <Form.Control placeholder="City" name="city" onInputChange={onInputChange} />
          </Col>
          <Col>
            <Form.Control placeholder="Zip" name="zip" onInputChange={onInputChange} />
          </Col>
        </Row>

        {/* Phone */}
        <Form.Group className="mb-3" controlId="formBasicPhone">
          <Form.Label>Phone</Form.Label>
          <Form.Control type="text" placeholder="Phone number" name="phone" onInputChange={onInputChange} required />
        </Form.Group>

        {/* Email */}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name="email" onInputChange={onInputChange} required />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        {/* Password */}
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            onInputChange={onInputChange}
            required
          />
        </Form.Group>

        {/* Submit */}
        <Row className="text-center">
          <Col>
            <Button type="submit" className="mb-3">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};
