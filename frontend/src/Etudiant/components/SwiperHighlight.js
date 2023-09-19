import React from "react";
import { Swiper } from "swiper/react";
import PropTypes from "prop-types";
import "swiper/css";

export default function SlideItems({ children }) {
  return (
    <Swiper slidesPerView={"auto"} spaceBetween={24}>
      {children}
    </Swiper>
  );
}


SlideItems.propTypes = {
    children: PropTypes.node.isRequired,
  };
  