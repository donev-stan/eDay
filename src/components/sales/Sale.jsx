import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { getSaleByID } from "../../core/services/SaleService";
import { getSellerByID } from "../../core/services/SellerService";
import { getLoggedSeller } from "../../core/services/AuthService";
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

  useEffect(() => {
    getSaleByID(props.computedMatch.params.id)
      .then((response) => {
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
      });
  }, [props.computedMatch.params.id, sale.creatorID]);

  return (
    <Container className="my-4" fluid>
      <Row>
        {/* Main content (sale item) */}
        <Col lg="8">
          {/* Sale Item Pictures */}
          <Carousel fade>
            {/* {sale.pictures &&
              sale.pictures.forEach((pictureLink) => (
                // <SaleImage key={pictureLink} pictureLink={pictureLink} />
                <Carousel.Item>
                  {console.log(pictureLink)}
                  <img className="d-block w-100" src={pictureLink} />
                </Carousel.Item>
              ))} */}

            {sale.pictures[0] && (
              <Carousel.Item>
                <img className="d-block w-100" src={sale.pictures[0]} />
              </Carousel.Item>
            )}

            {sale.pictures[1] && (
              <Carousel.Item>
                <img className="d-block w-100" src={sale.pictures[1]} />
              </Carousel.Item>
            )}

            {sale.pictures[2] && (
              <Carousel.Item>
                <img className="d-block w-100" src={sale.pictures[2]} />
              </Carousel.Item>
            )}
          </Carousel>

          <Container className="mt-2">
            <h2>{sale.title}</h2>
            <h6>Created: {sale.createdDate}</h6>
            <h6>Updated: {sale.lastUpdated}</h6>
          </Container>

          <Container>
            <p>{sale.description}</p>
          </Container>

          {isSeller && (
            <Container>
              <Row>
                <Col>
                  <Button variant="warning">Edit</Button>{" "}
                </Col>
                <Col>
                  <Button variant="danger">Delete</Button>{" "}
                </Col>
              </Row>
            </Container>
          )}
        </Col>

        {/* Side content (seller info) */}
        <Col className="text-center" lg="4">
          <Container className="mb-4">
            {/* Seller Picture */}
            <Image src={seller.picture} roundedCircle />
            <Container className="mt-2 mb-4">
              <h3>
                {seller.firstName} {seller.lastName}
              </h3>
              <h5>{seller.phone}</h5>
            </Container>
          </Container>

          <Container className="mt-4">
            <h6>Other items for sale:</h6>
            <ListGroup>
              <ListGroup.Item>Cras justo odio</ListGroup.Item>
              <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
              <ListGroup.Item>Morbi leo risus</ListGroup.Item>
              <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
              <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
            </ListGroup>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};
