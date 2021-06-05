import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import { getSalesBySellerID, returnReadableDate } from "../../core/services/SaleService";
import { deleteSale, getSaleByID } from "../../core/services/SaleService";
import { getSellerByID } from "../../core/services/SellerService";
import { getLoggedSeller } from "../../core/services/AuthService";
import { itemCondition } from "../../core/services/SaleService";
import { Link, Redirect } from "react-router-dom";

// import { SaleImage } from "./SaleImage";

export const Sale = (props) => {
  const [sale, setSale] = useState({
    id: 1,
    title: "Razer Blade 15",
    description: "Blabla bla bla",
    creatorID: 3,
    createdDate: "2021-05-21T06:11:51.870Z",
    lastUpdated: "2021-05-21T06:11:51.870Z",
    category: "electronics",
    pictures: [
      "https://picsum.photos/200/100?random=1",
      "https://picsum.photos/200/100?random=2",
      "https://picsum.photos/200/100?random=3",
    ],
  });
  const [seller, setSeller] = useState({});
  const [isSeller, setIsSeller] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [sellerSales, setSellerSales] = useState([]);

  useEffect(() => {
    getSaleByID(props.computedMatch.params.id)
      .then((response) => {
        response.data.createdDate = returnReadableDate(response.data.createdDate);
        response.data.lastUpdated = returnReadableDate(response.data.lastUpdated);
        setSale(response.data);
      })
      .then((_) => {
        getSellerByID(sale.creatorID).then((response) => {
          setSeller(response.data);

          const loggedSeller = getLoggedSeller();
          if (loggedSeller.id === sale.creatorID) {
            setIsSeller(true);
          }
        });
      })
      .then(async (_) => {
        setSellerSales(await getSalesBySellerID(seller.id));
      });
  }, [props.computedMatch.params.id, sale.creatorID]);

  // Badge Condition Color
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
          {/* Main content (sale item) */}
          <Col lg="8">
            {/* Sale Item Pictures */}
            <Carousel fade className="pl-2 pr-2 mt-2 text-center">
              {sale.pictures[0] && (
                <Carousel.Item style={{maxHeight: '75%', maxWidth: '75%'}}>
                  <img
                    className="d-block w-100"
                    src={sale.pictures[0]}
                    alt="Sale Item"
                  />
                </Carousel.Item>
              )}

              {sale.pictures[1] && (
                <Carousel.Item style={{maxHeight: '75%', maxWidth: '75%'}}>
                  <img
                    className="d-block w-100"
                    src={sale.pictures[1]}
                    alt="Sale Item"
                  />
                </Carousel.Item>
              )}

              {sale.pictures[2] && (
                <Carousel.Item style={{maxHeight: '75%', maxWidth: '75%'}}>
                  <img
                    className="d-block w-100"
                    src={sale.pictures[2]}
                    alt="Sale Item"
                  />
                </Carousel.Item>
              )}
            </Carousel>

            <Container className="mt-4">
              <Row>
                <Col sm={10}>
                  <h2>{sale.title}</h2>
                </Col>
                <Col sm={2} className="text-center mt-2">
                  <i>${sale.price}</i>
                </Col>
              </Row>
              <h6>Created: {sale.createdDate}</h6>
              <h6>Updated: {sale.lastUpdated}</h6>
              Condition:{" "}
              <Badge variant={badgeConditionColor}>{sale.condition}</Badge>
            </Container>

            <Container className="mt-3">
              <p>{sale.description}</p>
            </Container>

            {isSeller && (
              <Container className="text-right">
                <Row>
                  <Col>
                    <Link to={`/sales/edit/${sale.id}`}>
                      <Button variant="warning">Edit Sale</Button>{" "}
                    </Link>

                    <Link>
                      <Button
                        variant="danger"
                        onClick={() => onSaleDelete(sale.id)}
                      >
                        Delete Sale
                      </Button>{" "}
                    </Link>
                  </Col>
                </Row>
              </Container>
            )}
          </Col>

          {/* Side content (seller info) */}
          <Col className="text-center mt-2" lg="4">
            <Container className="my-4">
              {/* Seller Picture */}
              <Image src={seller.picture} roundedCircle style={borderShadow} />
              <Container className="mt-4 mb-4">
                <h3>
                  {seller.firstName} {seller.lastName}
                </h3>
                <h5>{seller.phone}</h5>
                <h6>{seller.email}</h6>
              </Container>
            </Container>

            <Container className="mt-4">
              <h6>Other items for sale:</h6>
              <ListGroup className="pl-4 pr-4">
                {console.log(sellerSales)}
                {sellerSales &&
                  sellerSales.map((sale) => (
                    <ListGroup.Item>{sale}</ListGroup.Item>
                  ))}
              </ListGroup>
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
