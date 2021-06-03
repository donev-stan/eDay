import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { getAllSales } from "../../core/services/SaleService";
import { SaleCard } from "./SaleCard";

export const Sales = (props) => {

    const [sales, setSales] = useState([]);

    useEffect(() => {
        const searchParam = props.location.search.split('=')[1];  

        getAllSales(searchParam).then(sales => {
            setSales(sales);
        }).catch(error => console.error(error));
    }, [props.location.search])

  return (
    <Container className="my-4 text-center">
        <Row>
            { sales.map(sale => <SaleCard key={sale.id} sale={sale} />) }
        </Row>
    </Container>

  );
};
