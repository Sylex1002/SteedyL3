
// base url
export const BaseURL = "http://127.0.0.1:8000";

// connect on socket
export const API_WEBSoCKET="ws://127.0.0.1:8000/ws";

// api for django server
export const API_BASE_URL = "http://127.0.0.1:8000/api";

// api for cloudinary
export const API_CLOUDINARY = "https://res.cloudinary.com/dxxljmurl";


// cloudinary focus
export const verificationCloudinaryFocus = (img) => {
  const startIndex = img.indexOf("/video/upload/");
  const formattedImageUrl = API_CLOUDINARY + img.substring(startIndex);
  return formattedImageUrl;
};

// cloudinary highlight
export const verificationCloudinaryHighlight = (img) => {
  const startIndex = img.indexOf("/image/upload/");
  const formattedImageUrl = API_CLOUDINARY + img.substring(startIndex);
  return formattedImageUrl;
};
