import React from "react";
import { Swiper } from "swiper/react";
import PropTypes from "prop-types";
import "swiper/css";

export default function SlideItemsZone({ children }) {
  return (
    <Swiper slidesPerView={"auto"} spaceBetween={12}>
      {children}
    </Swiper>
  );
}

SlideItemsZone.propTypes = {
  children: PropTypes.node.isRequired,
};
