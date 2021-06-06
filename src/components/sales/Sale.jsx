import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
// import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import {
  badgeColor,
  // getSalesBySellerID,
  returnReadableDate,
} from "../../core/services/SaleService";
import { deleteSale, getSaleByID } from "../../core/services/SaleService";
import { getSellerByID } from "../../core/services/SellerService";
import { Link, Redirect } from "react-router-dom";
import { getLoggedSeller } from "../../core/services/AuthService";

export const Sale = (props) => {
  const [saleItem, setSaleItem] = useState({});
  const [seller, setSeller] = useState({});
  const [isSellerOwner, setIsSellerOwner] = useState(false);
  const [redirect, setRedirect] = useState(false);
  // const [sellerSales, setSellerSales] = useState(null);

  useEffect(() => {
    const loggedSeller = getLoggedSeller();

    // Get Sale Item Data
    getSaleByID(props.computedMatch.params.id).then((response) => {
      response.data.createdDate = returnReadableDate(response.data.createdDate);
      response.data.lastUpdated = returnReadableDate(response.data.lastUpdated);
      setSaleItem(response.data);

      // Get Sale Item Owner
      if (loggedSeller.id !== saleItem.creatorID) {
        // if its not the logged user
        if (saleItem.creatorID) {
          getSellerByID(saleItem.creatorID).then((response) => {
            setSeller(response.data);
          });
        }
      } else {
        // owner is logged user
        setSeller(loggedSeller);
        setIsSellerOwner(true);
      }
    });
  }, [props.computedMatch.params.id, saleItem.creatorID]);

  // Badge Condition Color
  let badgeConditionColor = badgeColor(saleItem.condition);

  const onSaleDelete = (saleID) => {
    deleteSale(saleID).then((_) => {
      setRedirect(true);
    });
  };

  return (
    <>
      {redirect && <Redirect to="/sales" />}
      <Container className="my-4" fluid>
        <Row>
          {/* Main content (saleItem item) */}
          <Col lg="8">
            <Carousel fade className="pl-2 pr-2 mt-2">
              {saleItem.pictures && saleItem.pictures[0] && (
                <Carousel.Item style={{ maxHeight: "75%", maxWidth: "75%" }}>
                  <img
                    className="d-block w-100"
                    src={saleItem.pictures[0]}
                    alt="Sale Item"
                  />
                </Carousel.Item>
              )}
              {saleItem.pictures && saleItem.pictures[1] && (
                <Carousel.Item style={{ maxHeight: "75%", maxWidth: "75%" }}>
                  <img
                    className="d-block w-100"
                    src={saleItem.pictures[1]}
                    alt="Sale Item"
                  />
                </Carousel.Item>
              )}

              {saleItem.pictures &&
                saleItem.pictures[2] &&
                saleItem.pictures[2] && (
                  <Carousel.Item style={{ maxHeight: "75%", maxWidth: "75%" }}>
                    <img
                      className="d-block w-100"
                      src={saleItem.pictures[2]}
                      alt="Sale Item"
                    />
                  </Carousel.Item>
                )}
            </Carousel>

            <Container className="mt-4">
              <Row>
                <Col sm={10}>
                  <h2>{saleItem.title}</h2>
                </Col>
                <Col sm={2} className="text-center mt-2">
                  <i>${saleItem.price}</i>
                </Col>
              </Row>
              <h6>Created: {saleItem.createdDate}</h6>
              <h6>Updated: {saleItem.lastUpdated}</h6>
              {saleItem.condition &&
                saleItem.condition !== "" &&
                "Condition:"}{" "}
              <Badge variant={badgeConditionColor}>{saleItem.condition}</Badge>
            </Container>

            <Container className="mt-3">
              <p>{saleItem.description}</p>
            </Container>
          </Col>

          {/* Side content (seller info) */}
          <Col className="text-center mt-2" lg="4">
            <Container className="my-4">
              <Image src={seller.picture} roundedCircle style={borderShadow} />
              <Container className="mt-4 mb-4">
                <h3>
                  {seller.firstName} {seller.lastName}
                </h3>
                <h5>{seller.phone}</h5>
                <h6>{seller.email}</h6>
              </Container>
            </Container>

            {isSellerOwner && (
              <Container className="text-center">
                <Row className="mb-2">
                  <Col>
                    <Link to={`/sales/edit/${saleItem.id}`}>
                      <Button variant="warning">Edit Sale</Button>{" "}
                    </Link>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button
                      variant="danger"
                      onClick={() => onSaleDelete(saleItem.id)}
                    >
                      Delete Sale
                    </Button>{" "}
                  </Col>
                </Row>
              </Container>
            )}

            <Container className="mt-4">
              {/* <h6>Other items for sale:</h6> */}
              {/* <ListGroup className="pl-4 pr-4">
                {sellerSales &&
                  sellerSales.map((sale) => (
                    <ListGroup.Item>{sale}</ListGroup.Item>
                  ))}
              </ListGroup> */}
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
};

const borderShadow = {
  WebkitBoxShadow: "3px 3px 5px 6px #ccc",
  MozBoxShadow: "3px 3px 5px 6px #ccc",
  boxShadow: "3px 3px 5px 6px #ccc",
};
