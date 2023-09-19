import axios from "axios";
import { API_BASE_URL } from "./ServiceApi";
import { getCookie } from "./Utils";

const instanceAxios = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Ajouter un intercepteur pour inclure le jeton d'accès dans les en-têtes de chaque demande
instanceAxios.interceptors.request.use(
  (config) => {
    const token = getCookie("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// intercepteur de reponse
instanceAxios.interceptors.response.use(
  (res) => {
    return res;
  },
  async function (error) {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      // originalRequest._retry = true;

      try {
        const token = getCookie("access_token");
        const response_token = await axios.post(`${API_BASE_URL}/newToken/`, {
          token: token,
        });
        const accessToken = response_token.data.access_token;
        // const refreshToken = response_token.data.refresh_token;
        // Ajoute le nouvel access token dans les cookies
        document.cookie = `access_token=${accessToken}; path=/; max-age=3600`;
        // Réessaye la requête initiale avec le nouveau token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return instanceAxios(originalRequest);
      } catch (error) {
        // Si la tentative de rafraîchissement échoue, redirige vers la page de connexion
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default instanceAxios;
