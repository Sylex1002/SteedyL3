import React, { useContext } from "react";
import {
  LanguageOutlined,
  DarkModeOutlined,
  FullscreenExitOutlined,
  NotificationsNoneOutlined,
  ListOutlined,
  ChatBubbleOutlineOutlined,
} from "@mui/icons-material";
import "./HeaderAdmin.css";
import { AppContext } from "../../../Context/AppContext";

export default function HeaderAdmin() {
  const { darkMode } = useContext(AppContext);

  return (
    <div id="HeaderAdmin" className={darkMode ? "HeaderAdmin_dark" : ""}>
      <div className="HeaderAdmin-content">
        <div className="HeaderAdmin-left">
          <div className="HeaderAdmin-search">
            {/* <input type="search" placeholder='Search...' />
            <SearchOutlined /> */}
          </div>
        </div>
        <div className="HeaderAdmin-right">
          <div className="HeaderAdmin_itemt">
            <LanguageOutlined
              className={
                darkMode ? "HeaderAdmin_icon_dark" : "HeaderAdmin_icon"
              }
            />
            <span>English</span>
          </div>
          <div className="HeaderAdmin_itemt">
            <DarkModeOutlined
              className={
                darkMode ? "HeaderAdmin_icon_dark" : "HeaderAdmin_icon"
              }
            />
          </div>
          <div className="HeaderAdmin_itemt">
            <FullscreenExitOutlined
              className={
                darkMode ? "HeaderAdmin_icon_dark" : "HeaderAdmin_icon"
              }
            />
          </div>
          <div className="HeaderAdmin_itemt">
            <NotificationsNoneOutlined
              className={
                darkMode ? "HeaderAdmin_icon_dark" : "HeaderAdmin_icon"
              }
            />
            <div className="counter">1</div>
          </div>
          <div className="HeaderAdmin_itemt">
            <ChatBubbleOutlineOutlined
              className={
                darkMode ? "HeaderAdmin_icon_dark" : "HeaderAdmin_icon"
              }
            />
            <div className="counter">2</div>
          </div>
          <div className="HeaderAdmin_itemt">
            <ListOutlined
              className={
                darkMode ? "HeaderAdmin_icon_dark" : "HeaderAdmin_icon"
              }
            />
          </div>
          <div className="HeaderAdmin_itemt">
            <img src="/assets/user.jpeg" className="avatar" alt="avatar" />
          </div>
        </div>
      </div>
    </div>
  );
}
