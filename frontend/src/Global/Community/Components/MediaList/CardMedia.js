import React from "react";
import "./styles/CardMedia.scss";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { BaseURL } from "../../../../Helpers/ServiceApi";

const CardMedia = ({ file, type }) => {
  // download media
  const download = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const blob = await response.blob();
      const blobURL = window.URL.createObjectURL(blob);
      const fileName = url.split("/").pop();
      const link = document.createElement("a");
      link.href = blobURL;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error during download:", error);
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.2 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3 }}
      className="card-media"
      style={{ maxWidth: "100%" }}
    >
      <div className="media">
        {type === "img" ? (
          <a
            href={`${BaseURL}${file}`}
            target="_blank"
            download
            rel="noreferrer"
          >
            <img src={`${BaseURL}${file}`} alt="...." />
          </a>
        ) : type === "video" ? (
          <video src={`${BaseURL}${file}`} alt="..." controls />
        ) : type === "audio" ? (
          <audio src={`${BaseURL}${file}`} controls />
        ) : null}
      </div>
      <div className="description">
        <div className="photo">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
          >
            <rect width="40" height="40" rx="8" fill="#FFECDA" />
            <path
              d="M26.4269 11H13.57C12.1497 11 10.9984 12.1513 10.9984 13.5715V26.4285C10.9984 27.8487 12.1497 29 13.57 29H26.4269C27.8471 29 28.9984 27.8487 28.9984 26.4285V13.5715C28.9984 12.1513 27.8471 11 26.4269 11Z"
              fill="#FFC288"
            />
            <path
              d="M17.4266 20C13.5695 20 12.2838 22.5714 10.998 22.5714L17.4266 20Z"
              fill="#FFC288"
            />
            <path
              d="M17.4254 20C21.2826 20 22.7655 22.5714 25.1397 22.5714L17.4254 20Z"
              fill="#FFC288"
            />
            <path
              d="M28.9947 21.2858C24.4947 21.2858 23.8518 25.143 21.2804 25.143L28.9947 21.2858Z"
              fill="#FFC288"
            />
            <path
              d="M28.9984 26.4285C28.9984 27.8487 27.8471 29 26.4269 29H13.57C12.1497 29 10.9984 27.8487 10.9984 26.4285L10.998 22.5714C12.2837 22.5714 13.5693 20.0003 17.426 20C21.2827 20.0003 22.7942 22.5714 25.1683 22.5714C26.0897 21.8633 27.2534 21.2858 28.9947 21.2858L28.9984 26.4285Z"
              fill="#F49030"
            />
            <path
              d="M26.4265 29C27.8467 29 28.998 27.8487 28.998 26.4285L28.9943 21.2858C27.253 21.2858 26.0893 21.8633 25.1679 22.5714C23.708 23.6933 22.8564 25.143 21.28 25.143C19.3522 25.143 15.129 25.3949 10.998 26.4285C10.998 27.8487 12.1494 29 13.5696 29H26.4265Z"
              fill="#EEA055"
            />
            <path
              d="M23.8528 18.7145C25.273 18.7145 26.4243 17.5632 26.4243 16.143C26.4243 14.7228 25.273 13.5715 23.8528 13.5715C22.4326 13.5715 21.2812 14.7228 21.2812 16.143C21.2812 17.5632 22.4326 18.7145 23.8528 18.7145Z"
              fill="#F49030"
            />
          </svg>
          <p>{file.split("/").pop()}</p>
        </div>
        {type !== "audio" && (
          <div className="btn-dowload">
            <button
              className="download"
              onClick={() => download(`${BaseURL}${file.data}`)}
            >
              Telecharger
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

CardMedia.propTypes = {
  file: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};

export default CardMedia;
