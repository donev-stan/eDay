import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { getSaleByID, saveItem } from "../../core/services/SaleService";
import { Redirect } from "react-router";
import { getLoggedSeller } from "../../core/services/AuthService";

export const SellItem = (props) => {
  const [item, setItem] = useState({
    pictures: [],
    title: "",
    description: "",
    price: "",
    condition: "",
  });
  const [redirect, setRedirect] = useState(false);
  const [redirectPath, setRedirectPath] = useState("/sales");

  useEffect(() => {
    if (props.computedMatch.params.id) {
      getSaleByID(props.computedMatch.params.id)
        .then((response) => {
          setRedirectPath(`/sales/${props.computedMatch.params.id}`);
          setItem(response.data);
        })
        .then((_) => {
          const loggedSeller = getLoggedSeller();
          if (!loggedSeller || loggedSeller.id !== item.creatorID) {
            setRedirect(true);
          }
        });
    }
  }, [props.computedMatch.params.id, item.creatorID]);

  const onInputChange = (e) => {
    e.persist();

    setItem((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    setRedirect(false);
    saveItem(item).then((_) => {
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
            {console.log(item)}
            <Form.Control
              placeholder="Place image link"
              className="my-1"
              name="link1"
              onChange={onInputChange}
              value={item.pictures[0] && item.pictures[0]}
            />
            <Form.Control
              placeholder="Place image link"
              className="my-1"
              name="link2"
              onChange={onInputChange}
              value={item.pictures[1] && item.pictures[1]}
            />
            <Form.Control
              placeholder="Place image link"
              className="my-1"
              name="link3"
              onChange={onInputChange}
              value={item.pictures[2]}
            />
          </Form.Group>

          <Form.Group className="my-2">
            <Form.Label>Title:</Form.Label>
            <Form.Control
              placeholder=""
              name="title"
              onChange={onInputChange}
              value={item.title}
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
              value={item.description}
              required
            />
          </Form.Group>

          <Form.Group className="my-2">
            <Form.Label>Price:</Form.Label>
            <Form.Control
              name="price"
              onChange={onInputChange}
              required
              value={item.price}
            />
          </Form.Group>

          <Form.Group className="my-2">
            <Form.Label>Condition:</Form.Label>
            <select
              name="condition"
              className="form-control"
              onChange={onInputChange}
            >
              <option value={item.condition ? item.condition : "Unknown"}>
                {item.condition ? item.condition : "Choose Condition"}
              </option>
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
