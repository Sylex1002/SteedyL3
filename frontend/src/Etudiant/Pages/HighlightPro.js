import React from "react";
import { useSelector } from "react-redux";
import LayoutProfilPro from "../Layout/LayoutProfilPro";
import CardHighlightPro from "../components/CardHighlightPro";
import { GET_ALL_HIGHLIGHT_LIST } from "../../Reducers/ReducerHighlight";
import "./style/HighlightPro.scss";

export default function HighlightPro() {
  const highlightList = useSelector(GET_ALL_HIGHLIGHT_LIST);

  return (
    <LayoutProfilPro>
      <div className="title">
        <p>Highlight</p>
      </div>
      <div className="highlightPro">
        {highlightList.map((highlight, index) => {
          return (
            <CardHighlightPro index={index} key={index} highlight={highlight} />
          );
        })}
      </div>
    </LayoutProfilPro>
  );
}
