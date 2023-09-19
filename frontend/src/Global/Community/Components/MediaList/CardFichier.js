import React from "react";
import "./styles/CardFichier.scss";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import PropTypes from "prop-types";
import { BaseURL } from "../../../../Helpers/ServiceApi";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const pageContainerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  maxHeight: "154px",
  width: "100%",
  objectFit: "cover",
  backgroundColor: "transparent",
  borderRadius: "10px",
};

const CardFichier = ({ file }) => {

  const onDocumentSuccess = ({ numPages }) => {
    // setNumPages(numPages);
    console.log(numPages);
  };

  //download file
  const download = (url) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const blobURL = window.URL.createObjectURL(new Blob([blob]));
        const fileName = url.split("/").pop();
        const link = document.createElement("a");
        link.href = blobURL;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
      });
  };

  return (
    <div style={{ maxWidth: "100%" }}>
      <div className="fichier">
        <Document
          file={`${BaseURL}${file}`}
          onLoadSuccess={onDocumentSuccess}
        >
          <div className="document-page" style={pageContainerStyle}>
            <Page pageNumber={1} height="44" />
          </div>
        </Document>
      </div>
      <div className="description">
        <div className="nom-fichier">
          <PictureAsPdfIcon />
          <p>{file.split("/").pop().slice(0,65)}</p>
        </div>
        <div className="button">
          <button
            className="voir"
            onClick={() => window.open(`${BaseURL}${file}`, "_blank")}
          >
            Ouvrir
          </button>
          <button
            className="telecharger"
            onClick={() => download(`${BaseURL}${file}`)}
          >
            Enregistrer sous
          </button>
        </div>
      </div>
    </div>
  );
};

CardFichier.propTypes = {
    file: PropTypes.object.isRequired,
    
  };
  

export default CardFichier;
