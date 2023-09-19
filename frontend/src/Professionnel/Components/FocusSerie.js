import React from "react";
import { motion } from "framer-motion";
import { Stack } from "@mui/material";
import PropTypes from "prop-types";
import { normalCardStat } from "./LinkStats";
import CreationSerie from "./CreationSerie";
import MySerieFocus from "./MySerieFocus";

export default function FocusSerie({ menuName }) {

  const [open, setOpen] = React.useState(false);

  const lorem =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

  return (
    <>
      <div className="stats">
        <motion.p
          className="titre"
          initial={{ translateX: "-100px" }}
          animate={{ translateX: 0 }}
          transition={{ duration: 0.6 }}
        >
          {menuName} série focus
        </motion.p>

        <Stack direction="column" spacing='24px'>
          {/* Nombre total des focus publiés */}
          <div onClick={() => setOpen(!open)}>
            {normalCardStat(
              false,
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M13.3346 6H7.33464C6.62739 6 5.94911 6.28095 5.44902 6.78105C4.94892 7.28115 4.66797 7.95942 4.66797 8.66667V20.6667C4.66797 21.3739 4.94892 22.0522 5.44902 22.5523C5.94911 23.0524 6.62739 23.3333 7.33464 23.3333H20.668C21.3752 23.3333 22.0535 23.0524 22.5536 22.5523C23.0537 22.0522 23.3346 21.3739 23.3346 20.6667V14.6667" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20.6667 7.3334L21.9373 8.66674M23.3333 4.62274C23.6888 4.99028 23.8856 5.48276 23.8814 5.99404C23.8771 6.50533 23.6722 6.99447 23.3107 7.35607L14 16.6667L10 18.0001L11.3333 14.0001L20.6493 4.6054C20.9768 4.27537 21.4151 4.07852 21.8793 4.0529C22.3436 4.02729 22.8008 4.17474 23.1627 4.46674L23.3333 4.62274Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>,
              "Créer une série",
              true,
              lorem,
              "",
              false
            )}
          </div>
          {open && <CreationSerie setOpen={setOpen} />}

          {/* Mes série */}
          {/* <div onClick={() => setOpenUpdate(true)}>
            {normalCardStat(
              false,
              <svg xmlns="http://www.w3.org/2000/svg" width="58" height="58" viewBox="0 0 58 58" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M29.0005 22.907C27.4277 22.907 25.9194 23.5318 24.8072 24.6439C23.6951 25.756 23.0703 27.2644 23.0703 28.8372C23.0703 30.41 23.6951 31.9184 24.8072 33.0305C25.9194 34.1427 27.4277 34.7674 29.0005 34.7674C30.5733 34.7674 32.0817 34.1427 33.1939 33.0305C34.306 31.9184 34.9308 30.41 34.9308 28.8372C34.9308 27.2644 34.306 25.756 33.1939 24.6439C32.0817 23.5318 30.5733 22.907 29.0005 22.907ZM25.4424 28.8372C25.4424 27.8935 25.8173 26.9885 26.4846 26.3212C27.1518 25.6539 28.0569 25.2791 29.0005 25.2791C29.9442 25.2791 30.8492 25.6539 31.5165 26.3212C32.1838 26.9885 32.5587 27.8935 32.5587 28.8372C32.5587 29.7809 32.1838 30.6859 31.5165 31.3532C30.8492 32.0205 29.9442 32.3954 29.0005 32.3954C28.0569 32.3954 27.1518 32.0205 26.4846 31.3532C25.8173 30.6859 25.4424 29.7809 25.4424 28.8372Z" fill="black" />
                <path fillRule="evenodd" clipRule="evenodd" d="M29 15C21.8616 15 17.0526 19.2761 14.2614 22.9022L14.2124 22.9671C13.5798 23.7878 12.9994 24.5421 12.6057 25.434C12.1834 26.3908 12 27.4329 12 28.8372C12 30.2415 12.1834 31.2836 12.6057 32.2404C13.001 33.1323 13.5814 33.8882 14.2124 34.7073L14.263 34.7722C17.0526 38.3983 21.8616 42.6744 29 42.6744C36.1384 42.6744 40.9474 38.3983 43.7386 34.7722L43.7876 34.7073C44.4202 33.8882 45.0006 33.1323 45.3943 32.2404C45.8166 31.2836 46 30.2415 46 28.8372C46 27.4329 45.8166 26.3908 45.3943 25.434C44.999 24.5421 44.4186 23.7878 43.7876 22.9671L43.737 22.9022C40.9474 19.2761 36.1384 15 29 15ZM16.1433 24.3492C18.7178 21.0014 22.9116 17.3721 29 17.3721C35.0884 17.3721 39.2807 21.0014 41.8567 24.3492C42.5526 25.2506 42.9574 25.7883 43.2247 26.3924C43.4745 26.9585 43.6279 27.6496 43.6279 28.8372C43.6279 30.0248 43.4745 30.7159 43.2247 31.282C42.9574 31.8861 42.551 32.4238 41.8583 33.3252C39.2791 36.673 35.0884 40.3023 29 40.3023C22.9116 40.3023 18.7193 36.673 16.1433 33.3252C15.4474 32.4238 15.0426 31.8861 14.7753 31.282C14.5255 30.7159 14.3721 30.0248 14.3721 28.8372C14.3721 27.6496 14.5255 26.9585 14.7753 26.3924C15.0426 25.7883 15.4506 25.2506 16.1433 24.3492Z" fill="black" />
              </svg>,
              "Mes série",
              true,
              'Vous pouvez voir vos séries avec leurs focus respectifs ici, ainsi que les modifier ou les supprimer.',
              "",
              false
            )}
          </div> */}
          <MySerieFocus />
        </Stack>
      </div>
    </>
  );
}


FocusSerie.propTypes = {
  menuName: PropTypes.string.isRequired,
};
