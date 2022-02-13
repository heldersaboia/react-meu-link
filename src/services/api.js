import axios from "axios";

export const key = "3d4ef83ec496f923bd78ffa3dd417141750c94ad";

const api = axios.create({
  baseURL: "https://api-ssl.bitly.com/v4",
  headers: {
    Authorization: `Bearer ${key}`,
  },
});

export default api;
