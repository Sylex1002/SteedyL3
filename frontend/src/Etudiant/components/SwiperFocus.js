import React from "react";
import { Swiper } from "swiper/react";
import PropTypes from "prop-types";
import "swiper/css";

export default function SlideItemsFocus({ children }) {
  return (
    <Swiper slidesPerView={"auto"} spaceBetween={12}>
      {children}
    </Swiper>
  );
}


SlideItemsFocus.propTypes = {
    children: PropTypes.node.isRequired,
  };
  