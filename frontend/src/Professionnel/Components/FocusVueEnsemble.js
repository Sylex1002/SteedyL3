import React from "react";
import { motion } from "framer-motion";
import { Stack } from "@mui/material";
import { accordion, cardStat, listLink, normalCardStat } from "./LinkStats";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import PropTypes from "prop-types";

export default function FocusVueEnsemble({ menuName }) {
  const lorem =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

  return (
    <>
      {menuName === "performance" && (
        <div className="stats">
          <motion.p
            className="titre"
            initial={{ translateX: "-100px" }}
            animate={{ translateX: 0 }}
            transition={{ duration: 0.6 }}
          >
            Performance
          </motion.p>

          <Stack direction="column" spacing={0.5}>
            {/* Nombre total des focus publiés */}
            <div>
              {normalCardStat(
                false,
                "",
                "Nombre total des focus publiés",
                true,
                lorem,
                "",
                false
              )}
            </div>
          </Stack>
        </div>
      )}

      {menuName === "engagements" && (
        <div className="stats">
          <motion.p
            className="titre"
            initial={{ translateX: "-100px" }}
            animate={{ translateX: 0 }}
            transition={{ duration: 0.6 }}
          >
            Engagements
          </motion.p>

          <Stack direction="column" spacing={0.5}>
            {/* Likes */}
            {accordion(
              cardStat(
                false,
                <FavoriteBorderIcon sx={{ width: "30px", height: "30px" }} />,
                listLink("", "Likes", lorem)
              ),
              <Stack direction="column" spacing={2}>
                <div>
                  {cardStat(
                    false,
                    "",
                    listLink("listLink", "Nombre total de Like", lorem)
                  )}
                </div>
                {cardStat(
                  false,
                  "",
                  listLink("listLink", "Nombre de Like par focus", lorem)
                )}
              </Stack>
            )}

            {/* Commentaires */}
            {accordion(
              cardStat(
                false,
                <ChatBubbleOutlineOutlinedIcon
                  sx={{ width: "30px", height: "30px" }}
                />,
                listLink("", "Commentaires", lorem)
              ),
              <Stack direction="column" spacing={2}>
                <div>
                  {cardStat(
                    false,
                    "",
                    listLink("listLink", "Nombre total de commentaire", lorem)
                  )}
                </div>
                {cardStat(
                  false,
                  "",
                  listLink("listLink", "Nombre de commentaire par focus", lorem)
                )}
              </Stack>
            )}
          </Stack>
        </div>
      )}
    </>
  );
}


FocusVueEnsemble.propTypes = {
    menuName: PropTypes.string.isRequired,
  };
  