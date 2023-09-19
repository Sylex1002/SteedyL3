export const dataParser = (num) => {
  // let options={
  //     // hour:"2-digit",munite:"2-digit",second:"2-digit",weekday:"long",
  //     year:"numeric", mouth:"short",day:"numeric",
  // }
  // let options = {
  //     weekday: "long", year: "numeric", mouth: "short", day: "numeric",
  // }

  // fr-FR
  let options = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  let timestamps = Date.parse(num);
  let date = new Date(timestamps).toLocaleDateString("fr-FR", options);
  return date.toString();
};

// 00:00
export const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");
  return `${formattedMinutes}:${formattedSeconds}`;
};

// date
export const dataParseHM = (timestamp) => {
  const date = new Date(timestamp);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const formattedTime = `${hours}:${minutes}`;
  return formattedTime;
};

// get cookie
export function getCookie(name) {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + "=")) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}

export function deleteCookie(name) {
  const domain = window.location.hostname;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${domain}; path=/;`;
}