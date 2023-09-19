import React, { useContext } from "react";
import SkeletonHighlightSlide from "../../Global/Components/SkeletonHighlightSlide";
import { verificationCloudinaryHighlight } from "../../Helpers/ServiceApi";
import { GET_ALL_HIGHLIGHT_LIST } from "../../Reducers/ReducerHighlight";
import { GET_ALL_FOCUS_LIST } from "../../Reducers/ReducerFocus";
import LayoutProfilPro from "../Layout/LayoutProfilPro";
import SlideItems from "../components/SwiperHighlight";
import SlideItemsFocus from "../components/SwiperFocus";
import { useSelector } from "react-redux";
import { AppContext } from "../../Context/AppContext";
import CardFocus from "../components/CardFocus";
import { useNavigate } from "react-router-dom";
import { SwiperSlide } from "swiper/react";
import { Stack } from "@mui/material";
import "./style/PublicationPro.scss";
import "swiper/css";

export default function PublicationMurEtudiant() {
  const { setInitialSliding } = useContext(AppContext);
  const highlight_list = useSelector(GET_ALL_HIGHLIGHT_LIST);
  const focus_list = useSelector(GET_ALL_FOCUS_LIST);
  const navigate = useNavigate();

  return (
    <LayoutProfilPro>
      <div className="Content">
        <div className="highlightSwipe">
          <div className="swiper">
            {highlight_list.length > 0 ? (
              <SlideItems className="SlideItemsActualite">
                {highlight_list.map((high, index) => {
                  return (
                    <SwiperSlide
                      key={index}
                      className="swiperItem"
                      onClick={() => {
                        setInitialSliding(index);
                        navigate(`/etudiant/Highlights/${high.id}`);
                      }}
                    >
                      <Stack direction="column" spacing={1}>
                        <img
                          src={verificationCloudinaryHighlight(high.file)}
                          className="imgHihglight"
                          alt="story"
                          width="100%"
                          height="100%"
                        />
                        {high.professionnel && (
                          <p>
                            {high.professionnel.user.first_name.slice(0, 7)}
                          </p>
                        )}
                      </Stack>
                    </SwiperSlide>
                  );
                })}
                <SwiperSlide />
                <SwiperSlide />
              </SlideItems>
            ) : (
              <SkeletonHighlightSlide />
            )}
          </div>
        </div>

        {/* <div className='Zone'>
                    <div className='title'>
                        <p>Serie 1</p>
                    </div>
                    <div className="FilActualite_zone_content">
                        <SlideItemsZone>
                            <SwiperSlide>
                                <CardZone />
                            </SwiperSlide>
                            <SwiperSlide>
                                <CardZone />
                            </SwiperSlide>
                            <SwiperSlide>
                                <CardZoneAvenir />
                            </SwiperSlide>
                        </SlideItemsZone>
                    </div>
                </div> */}

        <div className="focus">
          <div className="title">
            <p>Focus</p>
          </div>
          <div className="FocusContent">
            <SlideItemsFocus>
              {focus_list[0] !== undefined ? (
                focus_list.map((focus, index) => (
                  <SwiperSlide key={index}>
                    <CardFocus focus={focus}  maximWidth={"285px"} />
                  </SwiperSlide>
                ))
              ) : (
                <div>
                  <h4>focus id none</h4>
                </div>
              )}
            </SlideItemsFocus>
          </div>
        </div>
      </div>
    </LayoutProfilPro>
  );
}
