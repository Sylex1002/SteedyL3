import React, { useState } from "react";
import "./styles/Explorer.scss";
import LayoutDashboard from "../Layout/LayoutDashboard";
import { Stack, Tooltip } from "@mui/material";

// Icons
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import highlightIcon from "../../Images/icons/smartphone.svg";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import focusIcon from "../../Images/icons/radio.svg";
import Decouvrir from "../Components/Decouvrir";
import Highlight from "../Components/Highlight";
import Createur from "../Components/Createur";
import Focus from "../Components/Focus";

export default function Explorer() {
  // State pour recuperer le menu active
  const [menu, setMenu] = useState("decouvrir");
  const [handleMenu, setHandleMenu] = useState(false);

  return (
    <LayoutDashboard showSearch={true}>
      <div className="content">
        <div className="leftContent" style={handleMenu ? { width: '75%' } : null}>
          {/* Decouvrir page */}
          {menu === "decouvrir" && <Decouvrir />}
          {/* Highlight page */}
          {menu === "highlight" && <Highlight />}
          {/* Focus page */}
          {menu === "focus" && <Focus />}
          {/* Createur page */}
          {menu === "createur" && <Createur />}
        </div>
        <div className="rightContent" style={handleMenu ? { width: '25%', padding: '0' } : null}>
          <div className="menus">
            <Stack direction="column" spacing="12px">
              <div
                className="handle-rigth-content"
                style={handleMenu ? { transform: 'rotate(180deg)' } : null}
                onClick={() => setHandleMenu(!handleMenu)}
              >
                <KeyboardArrowLeftIcon sx={{ width: '20px', height: '20px' }} />
              </div>
              <div
                className={menu === "decouvrir" ? "menu activeMenu" : "menu"}
                onClick={() => setMenu("decouvrir")}
              >
                <Stack direction="row" spacing="8px">
                  {handleMenu ?
                    <>
                      <div
                        className="icon"
                        style={{
                          textAlign: "center",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <ExploreOutlinedIcon
                          sx={{ width: "20px", height: "20px" }}
                        />
                      </div>
                      <p>Découvrir</p>
                    </>
                    :
                    <Tooltip title="Découvrir" placement="left" arrow>
                      <div
                        className="icon"
                        style={{
                          textAlign: "center",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <ExploreOutlinedIcon
                          sx={{ width: "20px", height: "20px" }}
                        />
                      </div>
                    </Tooltip>
                  }
                </Stack>
              </div>
              <div
                className={menu === "highlight" ? "menu activeMenu" : "menu"}
                onClick={() => setMenu("highlight")}
              >
                <Stack direction="row" spacing="8px">
                  {handleMenu ?
                    <>
                      <div className="icon" style={{ textAlign: "center" }}>
                        <img
                          src={highlightIcon}
                          alt="..."
                          width="20px"
                          height="20px"
                        />
                      </div>
                      <p>Highlights</p>
                    </>
                    :
                    <Tooltip title="Highlights" placement="left" arrow>
                      <div className="icon" style={{ textAlign: "center" }}>
                        <img
                          src={highlightIcon}
                          alt="..."
                          width="20px"
                          height="20px"
                        />
                      </div>
                    </Tooltip>
                  }
                </Stack>
              </div>
              <div
                className={menu === "focus" ? "menu activeMenu" : "menu"}
                onClick={() => setMenu("focus")}
              >
                <Stack direction="row" spacing="8px">
                  {handleMenu ?
                    <>
                      <div className="icon" style={{ textAlign: "center" }}>
                        <img src={focusIcon} alt="..." width="20px" height="20px" />
                      </div>
                      <p>Focus</p>
                    </>
                    :
                    <Tooltip title="Focus" placement="left" arrow>
                      <div className="icon" style={{ textAlign: "center" }}>
                        <img src={focusIcon} alt="..." width="20px" height="20px" />
                      </div>
                    </Tooltip>
                  }
                </Stack>
              </div>
              <div
                className={menu === "createur" ? "menu activeMenu" : "menu"}
                onClick={() => setMenu("createur")}
              >
                <Stack direction="row" spacing="8px">
                  {handleMenu ?
                    <>
                      <div className="icon" style={{ textAlign: "center" }}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="22"
                          viewBox="0 0 28 28"
                          fill="none"
                        >
                          <path
                            d="M16.646 23.5049C18.5456 20.7599 19.1253 18.2376 19.2726 16.678C20.2533 17.035 21.053 17.4749 21.6309 17.962C22.355 18.5723 22.6832 19.2108 22.6832 19.8333V23.85H16.4072L16.646 23.5049ZM15.4705 23.2425L15.5723 23.85H12.4273L12.5292 23.2425L13.4742 17.6075L13.5092 17.3987L13.4145 17.2093L12.7423 15.8648C13.155 15.8347 13.5747 15.8167 13.9998 15.8167C14.425 15.8167 14.8447 15.8347 15.2574 15.8648L14.5851 17.2093L14.4904 17.3987L14.5255 17.6075L15.4705 23.2425ZM11.3537 23.5049L11.5925 23.85H5.3165V19.8333C5.3165 19.2121 5.64629 18.5735 6.37268 17.9624C6.95147 17.4754 7.7506 17.0359 8.72713 16.679C8.87458 18.2387 9.45451 20.7605 11.3537 23.5049ZM13.9998 4.15C16.2192 4.15 18.0165 5.94732 18.0165 8.16667C18.0165 10.386 16.2192 12.1833 13.9998 12.1833C11.7805 12.1833 9.98317 10.386 9.98317 8.16667C9.98317 5.94732 11.7805 4.15 13.9998 4.15Z"
                            stroke="black"
                            strokeWidth="1.3"
                          />
                        </svg>
                      </div>
                      <p>Créateurs</p>
                    </>
                    :
                    <Tooltip title="Créateurs" placement="left" arrow>
                      <div className="icon" style={{ textAlign: "center" }}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="22"
                          viewBox="0 0 28 28"
                          fill="none"
                        >
                          <path
                            d="M16.646 23.5049C18.5456 20.7599 19.1253 18.2376 19.2726 16.678C20.2533 17.035 21.053 17.4749 21.6309 17.962C22.355 18.5723 22.6832 19.2108 22.6832 19.8333V23.85H16.4072L16.646 23.5049ZM15.4705 23.2425L15.5723 23.85H12.4273L12.5292 23.2425L13.4742 17.6075L13.5092 17.3987L13.4145 17.2093L12.7423 15.8648C13.155 15.8347 13.5747 15.8167 13.9998 15.8167C14.425 15.8167 14.8447 15.8347 15.2574 15.8648L14.5851 17.2093L14.4904 17.3987L14.5255 17.6075L15.4705 23.2425ZM11.3537 23.5049L11.5925 23.85H5.3165V19.8333C5.3165 19.2121 5.64629 18.5735 6.37268 17.9624C6.95147 17.4754 7.7506 17.0359 8.72713 16.679C8.87458 18.2387 9.45451 20.7605 11.3537 23.5049ZM13.9998 4.15C16.2192 4.15 18.0165 5.94732 18.0165 8.16667C18.0165 10.386 16.2192 12.1833 13.9998 12.1833C11.7805 12.1833 9.98317 10.386 9.98317 8.16667C9.98317 5.94732 11.7805 4.15 13.9998 4.15Z"
                            stroke="black"
                            strokeWidth="1.3"
                          />
                        </svg>
                      </div>
                    </Tooltip>
                  }
                </Stack>
              </div>

            </Stack>
          </div>
        </div>
      </div>
    </LayoutDashboard>
  );
}
