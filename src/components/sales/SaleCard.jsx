import React from "react";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { itemCondition } from "../../core/services/SaleService";

export const SaleCard = ({ sale }) => {
  let badgeConditionColor = "";
  switch (sale.condition) {
    case itemCondition.New:
      badgeConditionColor = "success";
      break;

    case itemCondition.Refurbished:
      badgeConditionColor = "info";
      break;

    case itemCondition.Used:
      badgeConditionColor = "warning";
      break;

    case itemCondition.Damaged:
      badgeConditionColor = "danger";
      break;

    default:
      badgeConditionColor = "dark";
      break;
  }

  return (
    <Col className="my-2" md={6} lg={4}>

      <Card style={borderShadow}>
        <Link to={`/sales/${sale.id}`} style={{textDecoration: 'none'}}>

        <Card.Img variant="top" src={sale.pictures[0]} style={{maxHeight: '450px'}} />
        <Card.Body className="text-dark">
          <Card.Title>{sale.title}</Card.Title>
          <Card.Text>Price: ${sale.price}</Card.Text>
          {/* <Card.Text>{sale.description}</Card.Text> */}
          <Card.Text>
            <Badge variant={badgeConditionColor}>{sale.condition}</Badge>
          </Card.Text>
{/* 
          <Card.Link as={Link} to={`/sales/${sale.id}`}>
          <Button variant="primary">View more</Button>
        </Card.Link> */}
        </Card.Body>
        </Link>
      </Card>
    </Col>
  );
};

const borderShadow = {
  WebkitBoxShadow: "2px 2px 3px 2px #ccc",
  MozBoxShadow: "2px 2px 3px 2px #ccc",
  boxShadow: "2px 2px 3px 2px #ccc",
};
