import { MOCK_USER_DATA, MOCK_ACTIVITY_DATA, MOCK_AVARAGE_DATA, MOCK_USER_PERFORMANCE } from "./dataMocked";
import axios from "axios";
    

const BASE_URL = "http://localhost:3000";
const isMocked = sessionStorage.getItem("mock") === "true";


export const getUserData = (userId) => {
  if(isMocked){
    return Promise.resolve(MOCK_USER_DATA);
  }
  return axios.get(`${BASE_URL}/user/${userId}`)
    .then((response) => response.data.data)
    .catch((error) => {
      throw new Error("Erreur lors de la récupération des données utilisateur", error);
    });
};


export const getUserActivityData = (userId) => {
  if(isMocked){
    return Promise.resolve(MOCK_ACTIVITY_DATA);
  }
  return axios.get(`${BASE_URL}/user/${userId}/activity`)
    .then((response) => response.data.data.sessions)
    .catch(() => {
      throw new Error("Données d'activité introuvables pour cet utilisateur.");
    });
};

export const getUserAverageSessions = (userId) => {
  if(isMocked){
    return Promise.resolve(MOCK_AVARAGE_DATA);
  }
  return axios.get(`${BASE_URL}/user/${userId}/average-sessions`) 
    .then((response) => response.data.data.sessions)
    .catch(() => {
      throw new Error("Données de durée moyenne de séance introuvables pour cet utilisateur.");
    });
};


export const getUserPerformanceData = (userId) => {
  if(isMocked){
    return Promise.resolve(MOCK_USER_PERFORMANCE);
  }
  return axios.get(`${BASE_URL}/user/${userId}/performance`)
    .then((response) => response.data.data)
    .catch(() => {
      throw new Error("Données de performance introuvables pour cet utilisateur.");
    });
};























