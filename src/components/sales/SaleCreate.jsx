import React, { useState } from "react";
import { Redirect } from "react-router";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { saveItem } from '../../core/services/SaleService';

export const SaleCreate = () => {
  const [saleItem, setSaleItem] = useState({});
  const [redirect, setRedirect] = useState(false);

  const onInputChange = (e) => {
    e.persist();

    setSaleItem((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    saveItem(saleItem).then((_) => {
      setRedirect(true);
    });
  };

  return (
    <>
      {redirect && <Redirect to="/sales" />}
      <Container className="my-4">
        <Form onSubmit={onFormSubmit}>
          <Form.Group className="my-2">
            <Form.Label>Images:</Form.Label>
            <Form.Control
              placeholder="Place image link"
              className="my-1"
              name="itemImageLink1"
              onChange={onInputChange}
            />
            <Form.Control
              placeholder="Place image link"
              className="my-1"
              name="itemImageLink2"
              onChange={onInputChange}
            />
            <Form.Control
              placeholder="Place image link"
              className="my-1"
              name="itemImageLink3"
              onChange={onInputChange}
            />
          </Form.Group>

          <Form.Group className="my-2">
            <Form.Label>Title:</Form.Label>
            <Form.Control
              placeholder=""
              name="title"
              onChange={onInputChange}
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
              required
            />
          </Form.Group>

          <Form.Group className="my-2">
            <Form.Label>Price:</Form.Label>
            <Form.Control name="price" onChange={onInputChange} required />
          </Form.Group>

          <Form.Group className="my-2">
            <Form.Label>Condition:</Form.Label>
            <select
              name="condition"
              className="form-control"
              onChange={onInputChange}
            >
              <option value="New">New</option>
              <option value="Refurbished">Refurbished</option>
              <option value="Used">Used</option>
              <option value="Damaged">Damaged</option>
            </select>
          </Form.Group>

          <Form.Group className="my-4 text-center">
            <Button type="submit" className="mb-3">
              Put Item For Sale
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </>
  );
};
