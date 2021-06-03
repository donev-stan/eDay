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
    <Container>
      <Row>
        {error ? (
          <>
            {" "}
            <Alert key={5} variant={'info'} className="text-center my-4 text">
             Nothing to show you <br/> Try another searching criteria{" "}
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
