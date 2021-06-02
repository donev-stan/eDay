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
    }, [sales])

  return (
    <Container>
        <Row>
            { sales.map(sale => <SaleCard key={sale.id} sale={sale} />) }
        </Row>
    </Container>

  );
};
