import React from "react";
import HeaderBlock from "../components/HeaderBlock";
import MessageBox from "../components/MessageBox";

export default function PlayZone() {
  return (
    <div className="playZone">
      <HeaderBlock />
      <div className="messageBox">
        <MessageBox />
      </div>
    </div>
  );
}
