import React, { useEffect, useState } from "react";
import { CameraAltOutlined, BorderColorOutlined } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import "./ProfBanner.css";
import {
  UpdateProfilUserAdmin,
  uploadImageUserAction,
} from "../../../Actions/Admin/AdminUserAction";
import PropTypes from "prop-types";
import { BaseURL } from "../../../Helpers/ServiceApi";

export default function ProfBanner({ user }) {
  const dispatch = useDispatch();
  const [bio, setBio] = useState("");
  const [Activebio, setActivebio] = useState(false);

  useEffect(() => {
    return () => {
      setBio(user.bio);
    };
  }, [user]);

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleActiveBio = () => {
    setActivebio(!Activebio);
  };

  const handleSubmitBio = (e) => {
    e.preventDefault();
    if (bio.length > 250) {
      alert("erreur caracter trop longue");
    } else {
      const formdata = { bio: bio };
      let id = user.id;
      dispatch(UpdateProfilUserAdmin(id, formdata));
      setActivebio(false);
    }
  };

  const handleUploadImage = (e) => {
    const formdata = new FormData();
    formdata.append("user_id", user.id);
    formdata.append("file", e.target.files[0]);
    dispatch(uploadImageUserAction(formdata));
  };

  const UpdateBio = ({ handleBioChange, handleActiveBio, handleSubmitBio }) => (
    <div id="UpdateBio">
      <form className="UpdateBio_form" onSubmit={handleSubmitBio}>
        <textarea
          placeholder="Add your bio"
          value={bio ? bio : ""}
          onChange={handleBioChange}
          rows={3}
          cols={10}
        ></textarea>
        <div className="UpdateBio_btn">
          <button type="submit">update</button>
          <button onClick={handleActiveBio} type="button">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div id="ProfBanner">
      <div className="ProfBanner_content">
        <div className="ProfBanner_card">
          <div className="ProfBanner_card_head">
            <img src={`${BaseURL}${user.image_url}`} alt="pro_image" />
            <div className="ProfBanner_upload_card">
              <label htmlFor="ProfBanner_file">
                <CameraAltOutlined className="ProfBanner_upload" />
              </label>
              <input
                type="file"
                onChange={handleUploadImage}
                id="ProfBanner_file"
                hidden
              />
            </div>
          </div>
          <div className="ProfBanner_footer">
            <h3 className="ProfBanner_title">
              {user.first_name} {user.last_name}
            </h3>
            <h5>1,k followers . 1000 suivi(e)s</h5>
          </div>
        </div>
      </div>
      <div className="ProfBanner_bio_content">
        {Activebio ? (
          <UpdateBio
            handleActiveBio={handleActiveBio}
            handleBioChange={handleBioChange}
            bio={bio}
            handleSubmitBio={handleSubmitBio}
          />
        ) : (
          <>
            <p className="ProfBanner_bio">{user.bio}</p>
            <BorderColorOutlined
              onClick={handleActiveBio}
              className="ProfBanner_bio_icon"
            />
          </>
        )}
      </div>
    </div>
  );
}

ProfBanner.propTypes = {
  user: PropTypes.object.isRequired,
  handleBioChange: PropTypes.func.isRequired,
  handleSubmitBio: PropTypes.func.isRequired,
  handleActiveBio: PropTypes.func.isRequired,
};
