import React, { useState, useEffect } from "react";
import { getSellerByID } from "../../core/services/SellerService";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export const Seller = (props) => {
  const [seller, setSeller] = useState({});

  useEffect(() => {
    getSellerByID(props.match.params.id).then((response) => {
      setSeller(response.data);
    });
  }, []);

  return (
    <Container>
      <Row className="my-3">
        <Col xs={6} md={4}>
          <Image src={seller.picture} thumbnail />
        </Col>
        <Col>
          <Card className="text-center">
            <Card.Header>Badges: </Card.Header>
            <Card.Body>
              <Card.Title>{seller.name}</Card.Title>
              <Card.Text>{seller.bio}</Card.Text>
              <Button variant="info">Upvote</Button>
              <Button variant="warning" className="ml-2">Downvote</Button>
              <Button variant="danger" className="ml-4">Report</Button>
            </Card.Body>
            <Card.Footer className="text-muted">{seller.createdDate}</Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
