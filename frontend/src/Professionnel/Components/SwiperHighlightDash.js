import React, { useState } from "react";
import "./styles/SwiperHighlightDash.scss";
import { Grid, Stack } from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { verificationCloudinaryHighlight } from "../../Helpers/ServiceApi";
import PropTypes from "prop-types";

export default function SwiperHighlightDash({ initial, highlightPub, viewer, setOpenHighlight }) {
  const [activeHigh, setActiveHigh] = useState(initial);
  const [viewHigh, setViewHigh] = useState(viewer);

  const showingHigh = () => {
    if (viewHigh) {
      return highlightPub;
    } else {
      return highlightPub.slice(0, 3);
    }
  };

  const showMyHighlights = showingHigh().map((item, index) => {
    const background = `url(${verificationCloudinaryHighlight(item.file)})`;
    return (
      <Grid
        item
        md={3}
        sm={3}
        sx={{
          height: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        key={index}
      >
        <div
          className={
            activeHigh !== index
              ? "swiperSlideHighDash activeHigh"
              : "swiperSlideHighDash"
          }
          style={{ background: background, width: "100%" }}
          onClick={() => setActiveHigh(index)}
        >
          {activeHigh === index ? (
            <div className="description">
              <div className='stat-high-active'>
                <div className="like-view">
                  <div className="like">
                    <Stack direction='row' spacing='8px'>
                      <FavoriteIcon sx={{ width: "17px", height: "17px" }} />
                      <p>{item.like.length}</p>
                    </Stack>
                  </div>
                  <div className="view">
                    <Stack direction='row' spacing='8px'>
                      <VisibilityIcon sx={{ width: "18px", height: "18px" }} />
                      <p>{item.view.length}</p>
                    </Stack>
                  </div>
                </div>
              </div>
              <div className='high-description'>
                <Stack direction="column" spacing="18px">
                  <p>{item.description}</p>
                </Stack>
              </div>
            </div>
          ) : (
            <div className="stats">
              <Stack direction="row" spacing="24px">
                <Stack
                  direction="row"
                  spacing={1}
                  style={{
                    height: "45px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <FavoriteIcon sx={{ width: "23px", height: "23px" }} />
                  </div>
                  <div
                    style={{
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      fontSize: "14px",
                    }}
                  >
                    <p>{item.like.length}</p>
                  </div>
                </Stack>
                <Stack
                  direction="row"
                  spacing={1}
                  style={{
                    height: "45px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <VisibilityIcon sx={{ width: "23px", height: "23px" }} />
                  </div>
                  <div
                    style={{
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      fontSize: "14px",
                    }}
                  >
                    <p>{item.view.length}</p>
                  </div>
                </Stack>
              </Stack>
            </div>
          )}
        </div>
      </Grid>
    );
  });

  return (
    <div className="swiperHighlightDash">
      <Grid container spacing="12px" className="highlightShowing">
        {showMyHighlights}
        {!viewHigh &&
          <Grid
            item
            md={3}
            sm={3}
            sx={{
              height: "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className='view-all' onClick={() => setViewHigh(true)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  d="M7.125 4.5L11.625 9L7.125 13.5"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </Grid>
        }
      </Grid>
      <button className="close-modal" onClick={() => setOpenHighlight(false)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 22 23" fill="none">
          <path d="M10.9993 13.8332L2.83268 21.9998C2.52713 22.3054 2.13824 22.4582 1.66602 22.4582C1.19379 22.4582 0.804904 22.3054 0.499348 21.9998C0.193793 21.6943 0.0410156 21.3054 0.0410156 20.8332C0.0410156 20.361 0.193793 19.9721 0.499348 19.6665L8.66602 11.4998L0.499348 3.33317C0.193793 3.02761 0.0410156 2.63873 0.0410156 2.1665C0.0410156 1.69428 0.193793 1.30539 0.499348 0.999837C0.804904 0.694281 1.19379 0.541504 1.66602 0.541504C2.13824 0.541504 2.52713 0.694281 2.83268 0.999837L10.9993 9.1665L19.166 0.999837C19.4716 0.694281 19.8605 0.541504 20.3327 0.541504C20.8049 0.541504 21.1938 0.694281 21.4993 0.999837C21.8049 1.30539 21.9577 1.69428 21.9577 2.1665C21.9577 2.63873 21.8049 3.02761 21.4993 3.33317L13.3327 11.4998L21.4993 19.6665C21.8049 19.9721 21.9577 20.361 21.9577 20.8332C21.9577 21.3054 21.8049 21.6943 21.4993 21.9998C21.1938 22.3054 20.8049 22.4582 20.3327 22.4582C19.8605 22.4582 19.4716 22.3054 19.166 21.9998L10.9993 13.8332Z" fill="#AFAFAF" />
        </svg>
      </button>
    </div>
  );
}

SwiperHighlightDash.propTypes = {
  highlightPub: PropTypes.array.isRequired,
  initial: PropTypes.number.isRequired,
  viewer: PropTypes.bool.isRequired,
  setOpenHighlight: PropTypes.bool.isRequired
};
