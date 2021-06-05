import React from "react";
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';

export const Home = () => {
  return (
    <>
    <Container className="mt-2">
      <Alert variant="success">
        <Alert.Heading>Hey, nice to see you</Alert.Heading>
        <p>
          Aww yeah, eDay is like eBay but way more simpler and basic.
        </p>
        <hr />
        <p className="mb-0">
          You can access everything through the navigation. This includes:
        </p>
      </Alert>
    </Container>

    <Container className="mt-0">
      <Alert variant="success">
        <Alert.Heading>Hey, nice to see you</Alert.Heading>
        <p>
          Aww yeah, eDay is like eBay but way more simpler and basic.
        </p>
        <hr />
        <p className="mb-0">
          You can access everything through the navigation. This includes:
        </p>
      </Alert>
    </Container>
    </>
  );
};
