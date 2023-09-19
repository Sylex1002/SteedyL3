import React, {  useState } from "react";
import PropTypes from "prop-types";

export const AppContext = React.createContext(null);

export const AppProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [Uuid, setUuid] = useState(null);
  const [UuidFonction, setUuidFonction] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [getIdPro, setGetIdPro] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);

  // ========================HIGHLIGHT============================
  const [initialSliding, setInitialSliding] = useState(0);
  const [TimingSlide, setTimingSlide] = useState(false);
  const [playingFocusFooter, setPlayingFocusFooter] = useState(false);
  const [openModalComment, setOpenModal] = useState(false);
   // ============= STATE PUT FOCUS ON SERIE ========
   const [serieFocus, setSerieFocus] = useState('');


  // Notification
  const [notification, setNotification] = useState([]);

  // =============TOGGLE SLIDING===============
  const togglePlayFocus = () => {
    setPlayingFocusFooter(!playingFocusFooter);
  };

  // =============TOGGLE SLIDING===============
  const toggleSliding = () => {
    setTimingSlide(!TimingSlide);
  };

  // ==============TOGGLE OPEN MODAl==========
  const toggleOpenModal = () => {
    setOpenModal(!openModalComment);
  };


  const appContextValue = {
    togglePlayFocus,
    playingFocusFooter,
    setPlayingFocusFooter,
    darkMode,
    setDarkMode,
    Uuid,
    setUuid,
    TimingSlide,
    toggleSliding,
    initialSliding,
    setTimingSlide,
    setInitialSliding,
    toggleOpenModal,
    openModalComment,
    setOpenModal,
    searchInput,
    setSearchInput,

    // Get id professionnel connecter
    getIdPro,
    setGetIdPro,

    //
    UuidFonction,
    setUuidFonction,

    // notification
    setNotification,
    notification,

    openDrawer,
    setOpenDrawer,
    
    // serie
    serieFocus, setSerieFocus,
    
  };

  return (
    <AppContext.Provider value={appContextValue}>
      <div className={darkMode ? "app dark" : "app "}>{children}</div>
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
