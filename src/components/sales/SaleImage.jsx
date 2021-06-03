import React from "react";
import Carousel from "react-bootstrap/Carousel";

export const SaleImage = ({picture}) => {
  return (
    <Carousel.Item>
        {console.log(picture)}
      <img className="d-block w-100" src={picture} />
    </Carousel.Item>
  );
};
