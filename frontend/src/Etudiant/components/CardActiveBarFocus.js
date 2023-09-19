import React, { useContext, useEffect, useState } from "react";
import { AudioContext } from "../../Context/AudioContext ";
import { Cancel } from "@mui/icons-material";
import { Bars } from "react-loader-spinner";
import "./style/CardActiveBarFocus.scss";
import FooterFocus from "./FooterFocus";
import { motion } from "framer-motion";

export default function CardActiveBarFocus() {
  const {
    ActiveFootFocus,
    ActiveCircleFocus,
    handleActiveFooterFocus,
    handleActiveCercle,
  } = useContext(AudioContext);
  const [cancel, setCancel] = useState(false);

  const handleCancelOver = () => {
    setCancel(true);
  };

  const handleCancelLeave = () => {
    setCancel(false);
  };

  // ============================================================
  // const [dragging, setDragging] = useState(false);
  // const [cancel, setCancel] = useState(false);

  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ x: window.innerWidth - 94, y: window.innerHeight - 94 });
  const [initialMouseOffset, setInitialMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (dragging) {
      const onMouseMove = (e) => {
        const newX = e.clientX - initialMouseOffset.x;
        const newY = e.clientY - initialMouseOffset.y;

        // Limitez les coordonnées x et y en fonction de la taille de la fenêtre du navigateur
        const maxX = window.innerWidth - 30; // Largeur de la div
        const maxY = window.innerHeight - 30; // Hauteur de la div

        const limitedX = Math.max(0, Math.min(maxX, newX));
        const limitedY = Math.max(0, Math.min(maxY, newY));

        setPosition({ x: limitedX, y: limitedY });
      };

      const onMouseUp = () => {
        setDragging(false);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      };

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);

      return () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      };
    }
  }, [dragging, initialMouseOffset]);

  const onMouseDown = (e) => {
    setDragging(true);
    setInitialMouseOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
    // Empêcher la sélection de texte pendant le glissement
    e.preventDefault();
  };

  return (
    <div id="CardActiveBarFocus">
      {/* cercle of focus */}
      {ActiveFootFocus && !ActiveCircleFocus && (
        <motion.div
          //  initial={{ right: "10px", bottom: "10px", translateY: "100px" }}
          animate={{ translateY: 0 }}
          transition={{ duration: 1 }}
          id="cercle_focus"
          onMouseOver={handleCancelOver}
          onMouseLeave={handleCancelLeave}
          style={{
            position: 'absolute',
            top: position.y,
            left: position.x,
            cursor: dragging ? 'grabbing' : 'grab',
            zIndex: '9999'
          }}
          onMouseDown={onMouseDown}
          onDoubleClick={!dragging && handleActiveCercle}
        // ref={divRef}
        >
          <div>
            <Bars
              height="30"
              width="30"
              color="#f49030"
              ariaLabel="bars-loading"
              wrapperStyle={{}}
              visible={true}
            />
          </div>
          {/* cancel icon */}
          {cancel && (
            <Cancel onClick={handleActiveFooterFocus} id="cercle_cancel" />
          )}
        </motion.div>
      )}

      {/* focus listen footer */}
      {ActiveCircleFocus && (
        <motion.div
          initial={{ translateY: "200px" }}
          animate={{ translateY: 0 }}
          transition={{ duration: 1 }}
          className="footerFocus"
        >
          <FooterFocus />
        </motion.div>
      )}
    </div>
  );
}

