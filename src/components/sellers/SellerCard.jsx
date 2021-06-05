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
            <Card className="my-3" style={borderShadow}>
              <Card.Img variant="top" src={seller.picture} style={{maxHeight: '400px'}} />
              <Card.Body>
                <Card.Title>{seller.firstName} {seller.lastName}</Card.Title>
                <Card.Text>{seller.bio}</Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem>{seller.email}</ListGroupItem>
                <ListGroupItem>{seller.phone}</ListGroupItem>
                {/* <ListGroupItem>Rating: {seller.rating}</ListGroupItem> */}
                <ListGroupItem>Badges: {seller.badges.map(badge => (<Badge variant="success" className="mr-1">{badge}</Badge>))}</ListGroupItem>
              </ListGroup>
              <Card.Body>
                <Card.Link as={Link} to={`/sellers/${seller.id}`}>View Profile</Card.Link>
              </Card.Body>
            </Card>
        </Col>
    )
}

const borderShadow = {
  WebkitBoxShadow: '2px 2px 3px 2px #ccc', 
  MozBoxShadow:    '2px 2px 3px 2px #ccc',  
  boxShadow:         '2px 2px 3px 2px #ccc'
}