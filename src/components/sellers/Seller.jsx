import React, { useState, useEffect } from "react";
import { deleteSeller, getSellerByID } from "../../core/services/SellerService";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { getLoggedSeller, logout } from "../../core/services/AuthService";
import { Link, Redirect } from "react-router-dom";
import { getSalesBySellerID } from "../../core/services/SaleService";
import { SaleCard } from "../sales/SaleCard";

export const Seller = (props) => {
  const [seller, setSeller] = useState({});
  const [isSeller, setIsSeller] = useState(false);
  const [sellerSales, setSellerSales] = useState([]);
  // const [redirect, setRedirect] = useState(false);
  // const [redirectPath, setRedirectPath] = useState("/sellers");

  useEffect(() => {
    if (props.computedMatch.params.id) {
      getSellerByID(props.computedMatch.params.id)
        .then((response) => {
          setSeller(response.data);
        })
        .then(async (_) => {
          setSellerSales(await getSalesBySellerID(seller.id));
        });
    } else {
      setIsSeller(true);
      const loggedSeller = getLoggedSeller();
      setSeller(loggedSeller);

      (async () => {
        setSellerSales(await getSalesBySellerID(seller.id));
      })();
    }
  }, [props.computedMatch.params.id, seller.id]);

  const userLogout = (e) => {
    logout();
    // setRedirectPath("/login");
    // setRedirect(true);
  };

  const userDelete = (e) => {
    // deleteSeller(seller.id).then((_) => {
    //   setRedirect(true);
    // });
    deleteSeller(seller.id);
  };

  const userEdit = (e) => {
    // if (seller.id) {
    //   setRedirectPath(`/sellers/edit/${seller.id}`);
    //   setRedirect(true);
    // }
  };

  return (
    <>
      {/* {redirect && <Redirect to={redirectPath} />} */}
      <Container className="mt-4">
        <Row className="my-4">
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
              <Card.Footer className="text-muted">{seller.email}</Card.Footer>
            </Card>
            <Row className="text-center mt-3">
              {isSeller && (
                <>
                  <Col>
                    <Link to={`/sellers/edit/${seller.id}`}>
                      <Button variant="info" onClick={userLogout}>
                        Logout
                      </Button>
                    </Link>
                  </Col>
                  <Col>
                    <Link to={`/sellers/edit/${seller.id}`}>
                      <Button variant="warning" onClick={userEdit}>
                        Edit Profile
                      </Button>
                    </Link>
                  </Col>
                  <Col>
                    <Link to="/login">
                      <Button variant="danger" onClick={userDelete}>
                        Delete Profile
                      </Button>
                    </Link>
                  </Col>
                </>
              )}
            </Row>
          </Col>
        </Row>
        <Row className="mt-4">
          <h3>{seller.name} Currently For Sale: </h3>
        </Row>

        <Row className="mb-4">
          {sellerSales &&
            sellerSales.map((sale) => <SaleCard key={sale.id} sale={sale} />)}
        </Row>
      </Container>
    </>
  );
};

const borderShadow = {
  WebkitBoxShadow: "2px 2px 3px 2px #ccc",
  MozBoxShadow: "2px 2px 3px 2px #ccc",
  boxShadow: "2px 2px 3px 2px #ccc",
};
