import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { getSaleByID, saveItem } from "../../core/services/SaleService";
import { getLoggedSeller } from "../../core/services/AuthService";

export const SaleEdit = (props) => {
  const [saleItem, setSaleItem] = useState({
    pictures: [],
    itemImageLink1: "",
    itemImageLink2: "",
    itemImageLink3: "",
    title: "",
    description: "",
    price: "",
    condition: "",
    createdDate: "",
    lastUpdated: "",
    creatorID: 0,
    id: 0,
  });
  const [redirect, setRedirect] = useState(false);
  const [redirectPath, setRedirectPath] = useState("/");

  // Get Sale Item Data
  useEffect(() => {
    if (props.computedMatch.params.id) {
      getSaleByID(props.computedMatch.params.id).then((response) => {
        const loggedUser = getLoggedSeller();

        if (response.data.creatorID !== loggedUser.id) {
          setRedirectPath(`/sales/${props.computedMatch.params.id}`);
          setRedirect(true);
        } else {
          console.log(response.data);
          if (response.data.pictures && response.data.pictures[0]) {
            response.data.itemImageLink1 = response.data.pictures[0];
          }
          if (response.data.pictures && response.data.pictures[1]) {
            response.data.itemImageLink2 = response.data.pictures[1];
          }
          if (response.data.pictures && response.data.pictures[2]) {
            response.data.itemImageLink3 = response.data.pictures[2];
          }
          //   delete response.data.pictures;
          setSaleItem(response.data);
        }
      });
      // .catch((error) => {
      //   setError(error.message);
      // });
    }
  }, [props.computedMatch.params.id]);

  const onInputChange = (event) => {
    event.persist();

    setSaleItem((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    saveItem(saleItem).then((_) => {
      setRedirectPath(`/sales/${saleItem.id}`);
      setRedirect(true);
    });
  };

  return (
    <>
      {redirect && <Redirect to={redirectPath} />}
      <Container className="my-4">
        <Form onSubmit={onFormSubmit}>
          <Form.Group className="my-2">
            <Form.Label>Images:</Form.Label>
            <Form.Control
              placeholder="Place image link"
              className="my-1"
              name="itemImageLink1"
              onChange={onInputChange}
              value={saleItem.itemImageLink1}
            />
            <Form.Control
              placeholder="Place image link"
              className="my-1"
              name="itemImageLink2"
              onChange={onInputChange}
              value={saleItem.itemImageLink2}
            />
            <Form.Control
              placeholder="Place image link"
              className="my-1"
              name="itemImageLink3"
              onChange={onInputChange}
              value={saleItem.itemImageLink3}
            />
          </Form.Group>

          <Form.Group className="my-2">
            <Form.Label>Title:</Form.Label>
            <Form.Control
              placeholder=""
              name="title"
              onChange={onInputChange}
              value={saleItem.title}
              required
            />
          </Form.Group>

          <Form.Group className="my-2">
            <Form.Label>Description:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              onChange={onInputChange}
              value={saleItem.description}
              required
            />
          </Form.Group>

          <Form.Group className="my-2">
            <Form.Label>Price:</Form.Label>
            <Form.Control
              name="price"
              onChange={onInputChange}
              value={saleItem.price}
              required
            />
          </Form.Group>

          <Form.Group className="my-2">
            <Form.Label>Condition:</Form.Label>
            <select
              name="condition"
              className="form-control"
              onChange={onInputChange}
            >
              <option value={saleItem.condition}>
                Current:{" "}
                {saleItem.condition !== "" ? saleItem.condition : "None"}
                {!saleItem.condition && "None"}
              </option>
              <option value="New">New</option>
              <option value="Refurbished">Refurbished</option>
              <option value="Used">Used</option>
              <option value="Damaged">Damaged</option>
            </select>
          </Form.Group>

          <Form.Group className="my-4 text-center">
            <Button type="submit" className="mb-3">
              Update Item Data
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </>
  );
};
