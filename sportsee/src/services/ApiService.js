
import axios from "axios";

const MOCK_USER_DATA = {
  "id": 18,
        "userInfos": {
            "firstName": "Cecilia",
            "lastName": "Ratorez",
            "age": 34
        },
        "todayScore": 0.3,
        "keyData": {
            "calorieCount": 2500,
            "proteinCount": 90,
            "carbohydrateCount": 150,
            "lipidCount": 120
}};

const MOCK_ACTIVITY_DATA = 
       [
            {
                "day": "2020-07-01",
                "kilogram": 70,
                "calories": 240
            },
            {
                "day": "2020-07-02",
                "kilogram": 69,
                "calories": 220
            },
            {
                "day": "2020-07-03",
                "kilogram": 70,
                "calories": 280
            },
            {
                "day": "2020-07-04",
                "kilogram": 70,
                "calories": 500
            },
            {
                "day": "2020-07-05",
                "kilogram": 69,
                "calories": 160
            },
            {
                "day": "2020-07-06",
                "kilogram": 69,
                "calories": 162
            },
            {
                "day": "2020-07-07",
                "kilogram": 69,
                "calories": 390
            }
        ]
    

    const MOCK_USER_PERFORMANCE = {
      "userId": 18,
      "kind": {
          "1": "cardio",
          "2": "energy",
          "3": "endurance",
          "4": "strength",
          "5": "speed",
          "6": "intensity"
      },
      "data": [
          {
              "value": 200,
              "kind": 1
          },
          {
              "value": 240,
              "kind": 2
          },
          {
              "value": 80,
              "kind": 3
          },
          {
              "value": 80,
              "kind": 4
          },
          {
              "value": 220,
              "kind": 5
          },
          {
              "value": 110,
              "kind": 6
          }
      ]
  }

    const MOCK_AVARAGE_DATA = [
            {
                "day": 1,
                "sessionLength": 30
            },
            {
                "day": 2,
                "sessionLength": 40
            },
            {
                "day": 3,
                "sessionLength": 50
            },
            {
                "day": 4,
                "sessionLength": 30
            },
            {
                "day": 5,
                "sessionLength": 30
            },
            {
                "day": 6,
                "sessionLength": 50
            },
            {
                "day": 7,
                "sessionLength": 50
            }
        ]
 
    





const BASE_URL = "http://localhost:3000";
const isMocked = sessionStorage.getItem("mock")=== "true";

//donnnées utilisateur
export const getUserData = (userId) => {


  if(isMocked){
    console.log("jhcdgj")
    return Promise.resolve(MOCK_USER_DATA);
  }

  return axios.get(`${BASE_URL}/user/${userId}`)//requette get

    .then((response) => response.data.data)//traitement réponse réusssi
    .catch((error) => {//erreur potentielle
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























