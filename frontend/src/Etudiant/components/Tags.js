import { Grid } from "@mui/material";
import React from "react";
import "./style/Tags.scss";

export default function Tags() {
  return (
    <div className="tags">
      <div className="title">
        <p>Tags</p>
      </div>

      <div
        className="tag"
        style={{ marginTop: "15px", fontSize: "12px", maxWidth: "100%" }}
      >
        <Grid container>
          <Grid item className="item">
            <p>Design</p>
          </Grid>
          <Grid item className="item">
            <p>Informatique</p>
          </Grid>
          <Grid item className="item">
            <p>Arts</p>
          </Grid>
          <Grid item className="item">
            <p>Marketing</p>
          </Grid>
          <Grid item className="item">
            <p>Management</p>
          </Grid>
          <Grid item className="item">
            <p>Communication</p>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
