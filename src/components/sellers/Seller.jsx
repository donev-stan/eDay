import React, { useState, useEffect } from "react";
import { getSellerByID } from "../../core/services/SellerService";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";

export const Seller = (props) => {
  const [seller, setSeller] = useState({});

  useEffect(() => {
    getSellerByID(props.match.params.id).then((response) => {
      setSeller(response.data);
    });
  }, [props.match.params.id]);

  return (
    <Container>
      <Row className="my-2">
        <Col lg={4} className="my-2 text-center">
          <Image src={seller.picture} thumbnail alt="" />
        </Col>
        <Col lg={8} className="my-2">
          <Card className="text-center">
            <Card.Header>
              Badges:{" "}
              {seller.badges && seller.badges.map((badge, i) => (
                <Badge bg="success" text="dark" key={i}>{badge}</Badge>
              ))}
            </Card.Header>
            <Card.Body>
              <Card.Title>
                {seller.firstName} {seller.lastName}
              </Card.Title>
              <Card.Text>{seller.bio}</Card.Text>
              <Button variant="info">Upvote</Button>
              <Button variant="warning" className="ml-2">
                Downvote
              </Button>
              <Button variant="danger" className="ml-4">
                Report
              </Button>
            </Card.Body>
            <Card.Footer className="text-muted">
              {seller.createdDate}
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};