import React from "react";
import Slider from "react-slick";

const photoUrls = [
  "/img/carousel-photos/launch-party-group.jpg",
  "/img/carousel-photos/peanuts-rally.jpg",
  "/img/carousel-photos/launch-party-leadership.jpg",
  "/img/carousel-photos/1999-plant-rally-1.jpg",
  "/img/carousel-photos/launch-party-we-believe.jpg",
  "/img/carousel-photos/party-rainbow-balloons.jpg"
];

export default class SimpleSlider extends React.Component {
  render() {
    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      fade: true,
      lazyLoad: "progressive",
      arrows: false
    };
    return (
      <Slider {...settings}>
        {photoUrls.map((url, idx) => {
          return <img alt="" src={`${url}`} key={idx} />;
        })}
      </Slider>
    );
  }
}
