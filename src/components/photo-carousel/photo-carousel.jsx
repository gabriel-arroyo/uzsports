import React from "react";
import Slider from "react-slick";
import { PropTypes } from "prop-types";
import { Container } from "@mui/material";
import Photo from "../photo/photo";

const PhotoCarousel = () => {
  const photos = [
    { src: "https://picsum.photos/500", to: "/" },
    { src: "https://picsum.photos/100", to: "/" },
    { src: "https://picsum.photos/200", to: "/" },
    { src: "https://picsum.photos/200", to: "/" },
    { src: "https://picsum.photos/200", to: "/" },
    { src: "https://picsum.photos/200", to: "/" },
  ];
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 10000,
    cssEase: "ease-in-out",
    nextArrow: <Arrow />,
    prevArrow: <Arrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <Container sx={{ mt: "50px", mb: "50px", background: "black" }}>
      <Slider {...settings}>
        {photos.map((item, index) => (
          <Photo key={index} src={item.src} to={item.to} round />
        ))}
      </Slider>
    </Container>
  );
};

export default PhotoCarousel;

/**
 *
 * @param {*} props
 * @return {React.Component}
 */
function Arrow({ className, style, onClick }) {
  return (
    <div
      className={className}
      style={{
        ...style,
      }}
      onClick={onClick}
    />
  );
}

Arrow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};
