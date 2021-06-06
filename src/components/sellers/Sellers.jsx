import React, { useState, useEffect } from "react";
import { getAllSellers } from "../../core/services/SellerService";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import { SellerCard } from "./SellerCard";

export const Sellers = (props) => {
  const [sellers, setSellers] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const searchParam = props.location.search.split("=")[1];

    getAllSellers(searchParam).then((sellers) => {
      setSellers(sellers);
      setError(false);
      if (!(sellers.length !== 0)) {
        setError(true);
      }
    });
  }, [props.location.search]);

  return (
    <Container className="mt-4">
      <Row>
        {error ? (
          <>
            {" "}
            <Alert key={5} variant={"info"} className="text-center my-4 text">
              <Alert.Heading>Hmm..</Alert.Heading>
              <p>Seems like this page is empty.</p>
              <hr />
              <p className="mb-0">
                If this came as a result of a search, try another search
                criteria
              </p>
            </Alert>{" "}
          </>
        ) : (
          sellers.map((seller) => (
            <SellerCard key={seller.id} seller={seller} />
          ))
        )}
      </Row>
    </Container>
  );
};
