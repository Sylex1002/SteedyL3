import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import React from "react";

export const cardStat = (showImage, image, links) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="cardStat"
    >
      <Grid container spacing={2}>
        <Grid item md={1} sm={1} lg={1} className="image">
          <div
            style={{
              width: "35px",
              height: "35px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {showImage ? (
              <img src={image} alt="..." width="100%" height="100%" />
            ) : (
              image
            )}
          </div>
        </Grid>
        <Grid item md={11} sm={11} lg={11}>
          {links}
        </Grid>
      </Grid>
    </motion.div>
  );
};

export const listLink = (classes, title, text) => {
  return (
    <div className={classes}>
      <Stack direction="column" spacing={1} style={{ cursor: "pointer" }}>
        <p className="small_title">{title}</p>
        <p className="small_text">{text}</p>
      </Stack>
    </div>
  );
};

export const accordion = (summary, details) => {
  return (
    <motion.div
      initial={{ translateY: "80px" }}
      animate={{ translateY: "0" }}
      transition={{ duration: 0.6 }}
    >
      <Accordion className="accordion">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          {summary}
        </AccordionSummary>
        <AccordionDetails className="linkDetail">{details}</AccordionDetails>
      </Accordion>
    </motion.div>
  );
};

export const normalCardStat = (
  showImage,
  image,
  links,
  showText,
  text,
  navigation
) => {
  return (
    <Link to={navigation} style={{ color: "#000" }}>
      <motion.div
        initial={{ translateY: "80px" }}
        animate={{ translateY: "0" }}
        transition={{ duration: 0.6 }}
        className="normalCardStat"
      >
        <Grid container spacing={2}>
          <Grid item md={1} sm={1} lg={1} className="image">
            <div
              style={{
                width: "35px",
                height: "35px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {showImage ? (
                <img src={image} alt="..." width="100%" height="100%" />
              ) : (
                image
              )}
            </div>
          </Grid>
          <Grid item md={11} sm={11} lg={11}>
            {showText ? (
              <Stack direction="column" spacing={1}>
                <p className="small_title">{links}</p>
                <p
                  className="small_text"
                  style={{ color: "#000", fontWeight: "100" }}
                >
                  {text}
                </p>
              </Stack>
            ) : (
              <p
                className="small_title"
                style={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {links}
              </p>
            )}
          </Grid>
        </Grid>
      </motion.div>
    </Link>
  );
};
