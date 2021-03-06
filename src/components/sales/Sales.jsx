import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { getAllSales } from "../../core/services/SaleService";
import { SaleCard } from "./SaleCard";
import Alert from "react-bootstrap/Alert";

export const Sales = (props) => {
  const [sales, setSales] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const searchParam = props.location.search.split("=")[1];

    getAllSales(searchParam).then((returnedSales) => {
      setSales(returnedSales);
      setError(false);
      if (!(returnedSales.length !== 0)) {
        setError(true);
      }
    });
  }, [props.location.search]);

  return (
    <Container className="my-4 text-center" fluid style={{ width: "80%" }}>
      <Row>
        {error ? (
          <>
            {" "}
            <Alert key={5} variant={"info"} className="text-center my-4 text">
              <Alert.Heading>Hmm..</Alert.Heading>
              <p>Seems like this page is empty.</p>
              <hr />
              <p className="mb-0">
              If this came as a result of a search, try another search criteria
              </p>
            </Alert>{" "}
          </>
        ) : (
          sales.map((sale) => <SaleCard key={sale.id} sale={sale} />)
        )}
      </Row>
    </Container>
  );
};
