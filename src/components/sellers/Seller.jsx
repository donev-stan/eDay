import React, { useState, useEffect } from "react";
import { getSellerByID } from "../../core/services/SellerService";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
// import Badge from "react-bootstrap/Badge";
import { getLoggedSeller, logout } from "../../core/services/AuthService";
import { Link } from "react-router-dom";
import { getSalesBySellerID } from "../../core/services/SaleService";

export const Seller = (props) => {
  const [seller, setSeller] = useState({});
  const [isSeller, setIsSeller] = useState(false);
  const [sellerSales, setSellerSales] = useState([]);

  useEffect(() => {
    if (props.computedMatch.params.id) {
      getSellerByID(props.computedMatch.params.id).then((response) => {
        setSeller(response.data);
      });
    } else {
      setIsSeller(true);
      const loggedSeller = getLoggedSeller();
      setSeller(loggedSeller);
    }
    getSales();
  }, [props.computedMatch.params.id]);

  const getSales = () => {
    getSalesBySellerID(seller.id).then(response => {
      console.log(response);
    });
  }

  // const getSales = async () => {
  //   const sales = await getSalesBySellerID(seller.id);
  //   console.log(sales);
  // }

  const userLogout = (e) => logout();

  return (
    <Container className="mt-4">
      <Row className="my-2">
        <Col lg={4} className="my-2 text-center">
          <Image src={seller.picture} thumbnail alt="" style={borderShadow} />
        </Col>
        <Col lg={8} className="my-2">
          <Card className="text-center">
            <Card.Header className="text-muted">{seller.phone}</Card.Header>
            <Card.Body>
              <Card.Title>
                {seller.firstName} {seller.lastName}
              </Card.Title>
              <Card.Text>{seller.bio}</Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
              {seller.email}
            </Card.Footer>
          </Card>
          <Row className="text-center mt-2">
            {isSeller && (
              <>
                <Col>
                  <Link to="/login">
                    <Button variant="info" onClick={userLogout}>
                      Logout
                    </Button>
                  </Link>
                </Col>
                <Col>
                  <Link to={`/sellers/edit/${seller.id}`}>
                    <Button variant="warning">Edit Profile</Button>
                  </Link>
                </Col>
                <Col>
                  <Button variant="danger">Delete Profile</Button>
                </Col>
              </>
            ) }
          </Row>
        </Col>
      </Row>
      <Row className="mt-4">
        <h3>{seller.name} Currently For Sale: </h3>
      </Row>

      <Row>
            {}
      </Row>
    </Container>
  );
};

const borderShadow = {
  webkitBoxShadow: '2px 2px 3px 2px #ccc', 
  mozBoxShadow:    '2px 2px 3px 2px #ccc',  
  boxShadow:         '2px 2px 3px 2px #ccc'
}