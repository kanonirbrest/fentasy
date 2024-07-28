import React from "react";
import { config } from "react-spring";
import Carousel from "react-spring-3d-carousel";

import antikvar1 from "@/assets/images/antikvar1.jpeg";
import antikvar2 from "@/assets/images/antikvar2.jpeg";
import antikvar3 from "@/assets/images/antikvar3.webp";
import { ensureMinimumLength } from "@/routes/Tournaments/config.js";
import Slide from "@/routes/Tournaments/Slider/Slide/index.js";

const images = [
  antikvar1,
  antikvar2,
  antikvar3,
  antikvar1,
  antikvar2,
  antikvar3,
  antikvar2,
  antikvar1,
];
function Slider({ list: arr }) {
  const [goToSlide, setGoToSlide] = React.useState(null);
  const list = ensureMinimumLength(arr, 5);
  const items = list.map(
    ({ isActive, name, startDate, endDate, id }, index) => {
      return {
        key: index,
        id,
        content: (
          <Slide
            src={images[index]}
            isActive={isActive}
            name={name}
            startDate={startDate}
            endDate={endDate}
            id={id}
          />
        ),
      };
    },
  );

  const tournaments = items.map((slide, index) => {
    return {
      ...slide,
      onClick: () => {
        setGoToSlide(index);
      },
    };
  });
  const [slides] = React.useState(tournaments);
  console.log(slides, "slides");
  return (
    <div style={{ width: "80%", height: "500px", margin: "0 auto" }}>
      <Carousel
        slides={slides}
        goToSlide={goToSlide}
        offsetRadius={3}
        showNavigation={false}
        animationConfig={config.gentle}
      />
      <div
        style={{
          margin: "0 auto",
          marginTop: "2rem",
          width: "50%",
          display: "flex",
          justifyContent: "space-around",
        }}
      ></div>
    </div>
  );
}

export default Slider;
