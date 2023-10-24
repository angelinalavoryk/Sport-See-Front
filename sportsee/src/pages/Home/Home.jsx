import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getUserData, getUserActivityData, getUserAverageSessions, getUserPerformanceData } from "../../services/ApiService";
import Barchart from "../../components/BarChart/BarChart.jsx";
import Nutrients from "../../components/nutrients/Nutrients.jsx";
import Linechart from "../../components/lineChart/LineChart";
import Radarchart from "../../components/radarChart/Radarchart";
import Radialchart from "../../components/radialchart/Radialchart";
import UserSelector from "../../components/UserSelector/UserSeletor";
import { formatDay } from "../../components/BarChart/BarChart";
import { daysOfWeek } from "../../components/lineChart/LineChart.jsx";
import { performanceNamesInOrder } from "../../components/radarChart/Radarchart.jsx";
import "./_Home.scss";

function Home() {
  const { userId: paramUserId } = useParams(); // Récupère l'ID de l'URL
  const [userId, setUserId] = useState(paramUserId || localStorage.getItem("selectedUserId"));
  const [userData, setUserData] = useState(null);
  const [activityData, setActivityData] = useState([]);
  const [averageSessionsData, setAverageSessions] = useState([]);
  const [performanceData, setPerformanceData] = useState([]);
  const [nutrientData, setNutrientData] = useState(null);
  const [radialChartData, setRadialChartData] = useState(null);
  const [welcomeMessageVisible, setWelcomeMessageVisible] = useState(false);
  const location = useLocation();
  const [activityLoadingError, setActivityLoadingError] = useState(null);
  const [averageSessionLoadingError, setAverageSessionLoadingError] = useState(null);
  const [nutrientLoadingError, setNutrientLoadingError] = useState(null);
  const [radialChartLoadingError, setRadialChartLoadingError] = useState(null);
  const [radarChartLoadingError, setRadarlChartLoadingError] = useState(null);


  useEffect(() => {
    getUserData(userId)
      .then((userData) => {
        setUserData(userData);
        setNutrientData(
          userData.keyData
        );
        setRadialChartData({
          todayScorePercentage: userData.todayScore * 100,
          remainingPercentage: 100 - (userData.todayScore * 100)
        });
        
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données utilisateur", error);
        setNutrientLoadingError("Probleme de récupération des données. ");
        setRadialChartLoadingError("Probleme de récupération des données. ");
      });
  }, [userId]);

  useEffect(() => {
    getUserActivityData(userId)
      .then((activityData) => {
        setActivityData(
          activityData.map((session) => ({
            day: formatDay(session.day),
            kilogram: session.kilogram,
            calories: session.calories,
          }))
        );
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données d'activité", error);
        setActivityLoadingError("Probleme de récupération des données. ");
      });
  }, [userId]);


  useEffect(() => {
    getUserAverageSessions(userId)
      .then((averageSessionsData) => {
        setAverageSessions(
          averageSessionsData.map((session) => ({
            day: daysOfWeek[session.day - 1],
            sessionLength: session.sessionLength,
          }))
        );
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données de session moyenne", error);
        setAverageSessionLoadingError("Probleme de récupération des données. ");
      });
  }, [userId]);


  useEffect(() => {
    getUserPerformanceData(userId)
      .then((performanceData) => {
        setPerformanceData(
          performanceNamesInOrder.map((performanceName, index) => ({
            subject: performanceName,
            value: performanceData.data[index]?.value || 0,
          }))
        );
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données de performance", error);
        setRadarlChartLoadingError("Probleme de récupération des données. ");
      });
  }, [userId]);


  // Changement de l'URL
  useEffect(() => {
    // Vérifier si la location change et réinitialiser le choix de l'utilisateur si nécessaire
    if (location.pathname === "/" && welcomeMessageVisible) {
      setWelcomeMessageVisible(false);
    }
  }, [location, welcomeMessageVisible]);

  const handleUserClick = (id) => {
    setUserId(id);
    setWelcomeMessageVisible(true);
    localStorage.setItem("selectedUserId", id.toString()); // Stocke l'ID dans localStorage
  };

  const shouldShowWelcomeMessage =
    welcomeMessageVisible || location.pathname !== "/" || paramUserId;
    
  return (
    <div className="home">
      {!shouldShowWelcomeMessage && (
        <UserSelector userId={userId} handleUserClick={handleUserClick} />
       )} 
       {shouldShowWelcomeMessage && userData && ( 
        <div>
          <div className="welcome-div">
            <div>
              <span className="welcome">Bonjour, </span>
              <span className="first-name">{userData.userInfos.firstName}</span>
            </div>
            <span className="congradulation">
              Félicitation ! Vous avez explosé vos objectifs hier 👏
            </span>
          </div>
          <div className="container">
            <div className="row"> 
              <div className="garph-container">
              {activityLoadingError ? (
                  <div>{activityLoadingError}</div>
                ) : (
                <Barchart activityData={activityData} />
                )}
              </div>
              <div className="nutri-container">
              {nutrientLoadingError ? (
                  <div>{nutrientLoadingError}</div>
                ) : (
                <Nutrients nutrientData={nutrientData} />
                )}
              </div>
            </div>
            <div className="row-bottom">
              <div className="line-chart">
              {averageSessionLoadingError ? (
                  <div>{averageSessionLoadingError}</div>
                ) : (
                <Linechart averageSession={averageSessionsData} />
                )}
              </div>
              <div className="radar-chart">
              {radarChartLoadingError ? (
                  <div>{radarChartLoadingError}</div>
                ) : (
                <Radarchart performanceData={performanceData} />
                )}
              </div>
              <div className="radial-chart">
              {radialChartLoadingError ? (
                  <div>{nutrientLoadingError}</div>
                ) : (
                <Radialchart radialChartData={radialChartData} />
                )}
              </div>
            </div>
          </div>
        </div>
      )} 
    </div>
  );
}

export default Home;




