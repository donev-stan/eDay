import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { sellItem } from "../../core/services/SaleService";

export const SellItem = () => {

    const [item, setItem] = useState({});

    const onInputChange = (e) => {
        e.persist();

        setItem(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value.trim()
        }));
    }

    const onFormSubmit = (e) => {
        e.preventDefault();

        
        sellItem(item);
        // post new item to db
    }

  return (
    <Container className="my-4">
      <Form onSubmit={onFormSubmit}>
        <Form.Group className="my-2">
          <Form.Label>Images:</Form.Label>
          <Form.Control placeholder="Link" className="my-1" name="link1" onChange={onInputChange}/>
          <Form.Control placeholder="Link" className="my-1" name="link2" onChange={onInputChange}/>
          <Form.Control placeholder="Link" className="my-1" name="link3" onChange={onInputChange}/>
        </Form.Group>

        <Form.Group className="my-2">
          <Form.Label>Title:</Form.Label>
          <Form.Control placeholder="" name="title" onChange={onInputChange} required />
        </Form.Group>

        <Form.Group className="my-2">
          <Form.Label>Description:</Form.Label>
          <Form.Control as="textarea" rows={3} name="description" onChange={onInputChange} required />
        </Form.Group>

        <Form.Group className="my-2">
          <Form.Label>Price:</Form.Label>
          <Form.Control name="price" onChange={onInputChange} required />
        </Form.Group>

        <Form.Group className="my-2">
          <Form.Label>Condition:</Form.Label>
          <Form.Control name="price" onChange={onInputChange} required />
        </Form.Group>

        {/* <Form.Group className="my-2">
          <Form.Label>Categoty:</Form.Label>
          <Form.Select>
            <option>Choose category</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Gaming">Gaming</option>
          </Form.Select>
        </Form.Group> */}

        <Form.Group className="my-4 text-center">
          <Button type="submit" className="mb-3">
            Put Item For Sale
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};
