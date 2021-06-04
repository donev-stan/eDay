import React from "react";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export const SaleCard = ({ sale }) => {
  return (
    <Col className="my-2" md={6} lg={4}>
      <Card style={borderShadow}>
        <Card.Img variant="top" src={sale.pictures[0]} />
        <Card.Body>
          <Card.Title>{sale.title}</Card.Title>
          <Card.Text>Price: ${sale.price}</Card.Text>
          <Card.Text>{sale.description}</Card.Text>

          <Card.Link as={Link} to={`/sales/${sale.id}`}>
            <Button variant="primary">View more</Button>
          </Card.Link>
        </Card.Body>
      </Card>
    </Col>
  );
};

const borderShadow = {
  webkitBoxShadow: '2px 2px 3px 2px #ccc', 
  mozBoxShadow:    '2px 2px 3px 2px #ccc',  
  boxShadow:         '2px 2px 3px 2px #ccc'
}