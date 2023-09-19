import React, { useContext, useRef } from "react";
import { Swiper } from "swiper/react";
import PropTypes from "prop-types";

// Import Swiper styles
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { EffectCoverflow, Navigation, Autoplay } from "swiper";
import { AppContext } from "../../Context/AppContext";
// import { GET_USER_INFO_CONNECT } from "../../Reducers/ReducerUser";
// import { useDispatch, useSelector } from "react-redux";
// import { GET_HIGHLIGHT_UNVIEWED } from "../../Reducers/ReducerHighlight";
// import { viewHighlightAction } from "../../Actions/ActionHighlight";

export default function SwiperHighlightShow({ children }) {
  // const highlight_unviewed = useSelector(GET_HIGHLIGHT_UNVIEWED);
  // const user = useSelector(GET_USER_INFO_CONNECT);

  // const dispatch = useDispatch();
  const swiperRef = useRef(null);

  const { toggleSliding } = useContext(AppContext);
  const { initialSliding } = useContext(AppContext);

  const params = {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 0,
      modifier: 1,
      slideShadows: false,
    },
    spaceBetween: 20,
    modules: [EffectCoverflow, Navigation, Autoplay],
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    className: "mySwiper",
    initialSlide: initialSliding,
  };

  // const viewHighlight = async (highlightId) => {
  //   const formData = new FormData();
  //   formData.append("user_id", user.id);
  //   formData.append("highlight_id", highlightId);
  //   await dispatch(viewHighlightAction(formData));
  // };

  // Étape 2 : Gérer l'action lorsque le slide actif change
  const postView = () => {
    // Accéder au composant Swiper par la référence
    if (swiperRef.current) {
      // Obtenir l'index du slide actif
      // const activeIndex = swiperRef.current.swiper.activeIndex;
// 
      // Étape 3 : Accéder aux données du slide actif à partir de highlightList
      // const activeSlideData = highlight_unviewed[activeIndex];
      // console.log(activeSlideData)
      // Maintenant vous avez accès aux données du SwiperSlide actif
      // viewHighlight(activeSlideData.id)
    }
  };

  return (
    <>
      <Swiper
        {...params}
        ref={swiperRef}
        onSlideChange={() => {
          toggleSliding();
          postView();
        }}
      >
        {children}
      </Swiper>
    </>
  );
}

SwiperHighlightShow.propTypes = {
  children: PropTypes.node.isRequired,
};
