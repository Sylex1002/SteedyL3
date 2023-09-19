import React from "react";
import "./styles/CardCount.scss";
import { Grid, Stack } from "@mui/material";
import PropTypes from "prop-types";

export default function CardCount({ title, number, children }) {
  return (
    <div className="cardCount">
      <Grid container spacing="12px" direction="row">
        <Grid item md={4}>
          <div className="counterBlock">
            <div className="title">
              <p>{title}</p>
            </div>
            <div className="count">
              <Stack direction="row" spacing={2}>
                <p className="number">{number}</p>
                <p className="post">| Post</p>
              </Stack>
            </div>
          </div>
        </Grid>
        <Grid item md={8}>
          <div className="spoil">{children}</div>
        </Grid>
      </Grid>
    </div>
  );
}

CardCount.propTypes = {
  title: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};