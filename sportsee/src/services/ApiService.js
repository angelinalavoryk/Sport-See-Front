
import axios from "axios";

const BASE_URL = "http://localhost:3000";

//donnnées utilisateur
export const getUserData = (userId) => {
  return axios.get(`${BASE_URL}/user/${userId}`)//requette get
    .then((response) => response.data.data)//traitement réponse réusssi
    .catch((error) => {//erreur potentielle
      throw new Error("Erreur lors de la récupération des données utilisateur", error);
    });
};


export const getUserActivityData = (userId) => {
  return axios.get(`${BASE_URL}/user/${userId}/activity`)
    .then((response) => response.data.data.sessions)
    .catch(() => {
      throw new Error("Données d'activité introuvables pour cet utilisateur.");
    });
};

export const getUserAverageSessions = (userId) => {
  return axios.get(`${BASE_URL}/user/${userId}/average-sessions`) 
    .then((response) => response.data.data.sessions)
    .catch(() => {
      throw new Error("Données de durée moyenne de séance introuvables pour cet utilisateur.");
    });
};


export const getUserPerformanceData = (userId) => {
  return axios.get(`${BASE_URL}/user/${userId}/performance`)
    .then((response) => response.data.data)
    .catch(() => {
      throw new Error("Données de performance introuvables pour cet utilisateur.");
    });
};























