import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { getAllSales } from "../../core/services/SaleService";
import { SaleCard } from "./SaleCard";

export const Sales = () => {

    const [sales, setSales] = useState([]);

    useEffect(() => {
        getAllSales().then(response => {
            setSales(response.data);
        }).catch(error => console.error(error));
    }, [])

  return (
    <Container className="my-4 text-center">
        <Row>
            { sales.map(sale => <SaleCard key={sale.id} sale={sale} />) }
        </Row>
    </Container>

  );
};
