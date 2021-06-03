import React from 'react';
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Badge from "react-bootstrap/Badge";
import { Link } from "react-router-dom";

export const SellerCard = ({seller}) => {
    return (
        <Col lg={4}>
            <Card className="my-3">
              <Card.Img variant="top" src={seller.picture} />
              <Card.Body>
                <Card.Title>{seller.firstName} {seller.lastName}</Card.Title>
                <Card.Text>{seller.bio}</Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem>{seller.email}</ListGroupItem>
                <ListGroupItem>{seller.phone}</ListGroupItem>
                <ListGroupItem>Rating: {seller.rating}</ListGroupItem>
                <ListGroupItem>Badges: <Badge variant="success">New</Badge>{' '}</ListGroupItem>
              </ListGroup>
              <Card.Body>
                <Card.Link as={Link} to={`/seller/${seller.id}`}>View Profile</Card.Link>
              </Card.Body>
            </Card>
        </Col>
    )
}
