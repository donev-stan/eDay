import React from "react";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import { Link } from "react-router-dom";
import { badgeColor } from "../../core/services/SaleService";

export const SaleCard = ({ sale }) => {
  let badgeConditionColor = badgeColor(sale.condition);

  return (
    <Col className="my-2 text-center" md={6} lg={4}>
      <Card style={borderShadow}>
        <Link to={`/sales/${sale.id}`} style={{ textDecoration: "none" }}>
          <Card.Img
            variant="top"
            src={sale.pictures && sale.pictures[0]}
            style={{ maxHeight: "520px" }}
          />
          <Card.Body className="text-dark">
            <Card.Title>{sale.title}</Card.Title>
            <Card.Text>${sale.price}</Card.Text>
            <Card.Text>
              <Badge variant={badgeConditionColor}>{sale.condition}</Badge>
            </Card.Text>
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
