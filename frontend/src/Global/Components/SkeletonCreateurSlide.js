import { Skeleton, Stack } from "@mui/material";
import React from "react";

export default function SkeletonCreateurSlide() {
  return (
    <Stack
      direction="column"
      spacing={1}
      style={{
        width: "17.7vw",
        height: "35vh",
        padding: "8px",
        background: "#FFF",
        borderRadius: "8px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <div style={{ margin: "auto" }}>
          <Skeleton
            variant="circular"
            animation="wave"
            width={100}
            height={100}
          />
        </div>
        <div style={{ margin: "auto" }}>
          <Skeleton
            variant="rounded"
            animation="wave"
            width="100px"
            height="10px"
          />
        </div>
        <div style={{ margin: "auto" }}>
          <Skeleton
            variant="rounded"
            animation="wave"
            width="50px"
            height="5px"
          />
        </div>
        <div style={{ margin: "auto" }}>
          <Skeleton
            variant="rounded"
            animation="wave"
            width="80px"
            height="8px"
          />
        </div>
      </div>
      <div style={{ display: "inline-flex", flexDirection: "row", gap: "8px" }}>
        <Skeleton
          variant="rounded"
          animation="wave"
          width="75%"
          height="35px"
        />
        <Skeleton
          variant="rounded"
          animation="wave"
          width="25%"
          height="35px"
        />
      </div>
    </Stack>
  );
}
