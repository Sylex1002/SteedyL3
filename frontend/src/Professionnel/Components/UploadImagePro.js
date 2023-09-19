import React from "react";
import "./styles/UploadImagePro.scss";
import { uploadImageAction } from "../../Actions/actionAuth";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

export default function UploadImagePro({ id, image }) {
  const dispatch = useDispatch();

  const handleUpload = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("user_id", id);
    formData.append("file", file);

    try {
      await dispatch(uploadImageAction(formData));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="uploadImagePro">
      <div className="profil">
        <div className="photo">
          <img src={image} alt="steedy_pro" />
        </div>
      </div>
      <div className="btnUpload">
        {/* <div className='button'> */}
        <label
          htmlFor="upload"
          className="button"
          style={{ cursor: "pointer" }}
        >
          {/* <img src={cameraIcon} alt='steedy-upload' /> */}
          Modifier
        </label>
        <input type="file" id="upload" onChange={handleUpload} hidden />
        {/* </div> */}
      </div>
    </div>
  );
}

UploadImagePro.propTypes = {
  image: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
