import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const getUserData = (userId) => {
  return axios.get(`${BASE_URL}/user/${userId}`)
    .then((response) => response.data.data)
};
