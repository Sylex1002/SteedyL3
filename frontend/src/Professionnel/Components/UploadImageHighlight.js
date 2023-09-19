import React, { useCallback, useEffect, useState } from "react";
import imageImg from "../../Images/Capture-removebg-preview.png";
import imageCompression from "browser-image-compression";
import { useDropzone } from "react-dropzone";
import "./styles/UploadImageHighlight.scss";
import { Stack } from "@mui/material";
import PropTypes from "prop-types";

// Our app
export function UploadImageHighlight({ setImage, children, bg }) {
  const [files, setFiles] = useState([]);

//   const [compressor, setCompress] = useState(false);

  const compressImage = useCallback(async (file) => {
    try {
      const options = {
        maxSizeMB: 10, // Limite maximale de taille du fichier compressé (10 Mo dans cet exemple)
        maxWidthOrHeight: 500, // Définir une largeur maximale ou une hauteur maximale de l'image
      };

      const compressedFile = await imageCompression(file, options);
    //   setCompress(true);

      return Object.assign(compressedFile, {
        preview: URL.createObjectURL(compressedFile),
      });
    } catch (error) {
      console.error("Erreur lors de la compression de l'image");
      return null;
    }
  }, []);

  const onDrop = useCallback(
    async (acceptedFiles) => {
      setFiles([]);
      const compressedFiles = await Promise.all(
        acceptedFiles.map(async (file) => await compressImage(file))
      );

      const validFiles = compressedFiles.filter((file) => file !== null);

      setFiles((prevFiles) => [...prevFiles, ...validFiles]);

      setImage(validFiles);
    },
    [compressImage]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop,
  });

//   const thumbs = files.map((file) => (
//     <div key={file.name}>
//       <div>
//         <img
//           src={file.preview}
//           onLoad={() => URL.revokeObjectURL(file.preview)}
//         />
//       </div>
//     </div>
//   ));

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  return (
    <div className="uploadImageHighlight" style={{ background: bg }}>
      <div className="droping">
        <div {...getRootProps()} className="drop-zone">
          <input {...getInputProps()} />
          {isDragActive ? (
            <Stack
              direction="column"
              spacing={2}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={imageImg}
                alt="steedy-drop"
                height="200px"
                width="200px"
              />
              <p className={files[0] !== undefined && "p"}>Relacher</p>
            </Stack>
          ) : (
            <Stack
              direction="column"
              spacing={2}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={imageImg}
                alt="steedy-drop"
                height="200px"
                width="200px"
              />
              <p className={files[0] !== undefined && "p"}>
                Drag n drop some files here, or click to select files
              </p>
            </Stack>
          )}
          <div className="image">
            {/* {console.log(files, compressor)} */}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

UploadImageHighlight.propTypes = {
    children: PropTypes.node.isRequired,
    setImage: PropTypes.object.isRequired,
    bg: PropTypes.string.isRequired,
    
  };