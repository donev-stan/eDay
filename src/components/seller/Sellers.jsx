import React, { useState, useEffect } from "react";
import { getAllSellers } from "../../core/services/SellerService";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { SellerCard } from './SellerCard';

export const Sellers = () => {
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    getAllSellers().then((response) => {
      setSellers(response.data);
    });
  }, []);

  return (
    <Container>
      <Row>
        {sellers.map((seller) => (
          <SellerCard key={seller.id} seller={seller} />
        ))}
      </Row>
    </Container>
  );
};
