import React from "react";
import Slider from "react-slick";

const photoUrls = [
  [
    "/img/carousel-photos/launch-party-group.jpg",
    "Members of the guild assemble for a photo at the relaunch party in May 2019."
  ],
  [
    "/img/carousel-photos/peanuts-rally.jpg",
    "A guild member dressed as Mr. Peanut as part of a protest rally."
  ],
  [
    "/img/carousel-photos/launch-party-leadership.jpg",
    "Guild leadership members Jessica Contreras, Sarah Kaplan, Katie Mettler and Alice Li at the guild relaunch party in May 2019."
  ],
  ["/img/carousel-photos/1999-plant-rally-1.jpg", "Plant rally in 1999."],
  [
    "/img/carousel-photos/launch-party-we-believe.jpg",
    'Cards filled out by guild members completing the phrase "We believe..." at the relaunch party in May 2019.'
  ],
  [
    "/img/carousel-photos/party-rainbow-balloons.jpg",
    "Vice chair for commercial Pat Jacobs and Guild president Katie Mettler at the guild relaunch party in May 2019."
  ]
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
        {photoUrls.map((data, idx) => {
          return (
            <img
              alt={`${data[1]}`}
              title={`${data[1]}`}
              src={`${data[0]}`}
              key={idx}
            />
          );
        })}
      </Slider>
    );
  }
}
