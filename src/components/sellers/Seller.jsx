import React, { useState, useEffect } from "react";
import { getSellerByID } from "../../core/services/SellerService";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { getLoggedSeller } from "../../core/services/AuthService";

export const Seller = (props) => {
  const [seller, setSeller] = useState({});
  const [isSeller, setIsSeller] = useState(false);

  useEffect(() => {
    if (props.computedMatch.params.id) {
      getSellerByID(props.computedMatch.params.id).then((response) => {
        setSeller(response.data);
      });
    }
  }, [props.computedMatch.params.id]);

  useEffect(() => {
    const loggedSeller = getLoggedSeller();
    
    if (!seller.id) {
      setSeller(loggedSeller);
      setIsSeller(true);
      return;
    }
    
    if (loggedSeller.id === seller.id) {
      setIsSeller(true);
    }
  }, []);

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
              {seller.badges &&
                seller.badges.map((badge, i) => (
                  <Badge bg="success" text="dark" key={i}>
                    {badge}
                  </Badge>
                ))}
            </Card.Header>
            <Card.Body>
              <Card.Title>
                {seller.firstName} {seller.lastName}
              </Card.Title>
              <Card.Text>{seller.bio}</Card.Text>
              {isSeller ? (
                 <>
                 <Button variant="info">Logout</Button>
                 <Button variant="warning" className="ml-2">
                   Edit
                 </Button>
                 <Button variant="danger" className="ml-4">
                   Delete
                 </Button>
               </>
              ) : (
                <>
                  <Button variant="info">Upvote</Button>
                  <Button variant="warning" className="ml-2">
                    Downvote
                  </Button>
                  <Button variant="danger" className="ml-4">
                    Report
                  </Button>
                </>
              )}
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
