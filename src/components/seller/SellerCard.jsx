import React from 'react';
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

export const SellerCard = ({seller}) => {
    return (
        <Col>
            <Card className="my-3">
              <Card.Img variant="top" src={seller.picture} />
              <Card.Body>
                <Card.Title>{seller.name}</Card.Title>
                <Card.Text>{seller.bio}</Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem>{seller.email}</ListGroupItem>
                <ListGroupItem>{seller.phone}</ListGroupItem>
                <ListGroupItem>Rating: {seller.rating}</ListGroupItem>
              </ListGroup>
              <Card.Body>
                {/* <Card.Link as={Link} to="/sales">Card Link</Card.Link>
                <Card.Link as={Link} to="/sales">Another Link</Card.Link> */}
              </Card.Body>
            </Card>
        </Col>
    )
}
