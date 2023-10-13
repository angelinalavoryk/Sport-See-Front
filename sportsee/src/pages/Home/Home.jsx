import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { getUserData } from "../../services/ApiService";
import Graphique from '../../components/Graphique/Graphique.jsx'; 
import Nutrients from "../../components/nutrients/Nutrients.jsx";
import Linechart from "../../components/lineChart/LineChart";
import Radarchart from "../../components/radarChart/Radarchart";
import Radialchart from "../../components/radialchart/Radialchart";
import './_Home.scss';

function Home() {
  const { userId: paramUserId } = useParams(); // Récupère l'ID de l'URL
  const [userId, setUserId] = useState(paramUserId || localStorage.getItem("selectedUserId") || 12);
  const [userData, setUserData] = useState(null);
  const [welcomeMessageVisible, setWelcomeMessageVisible] = useState(false);
  const [loadingError, setLoadingError] = useState(null); //gérer les erreurs de chargement
  const location = useLocation();

  useEffect(() => {
    getUserData(userId)
      .then((data) => {
        setUserData(data);
        setLoadingError(null); // réinitialiser l'erreur en cas de succès du chargement
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données utilisateur", error);
        setLoadingError("Erreur lors du chargement des données. Veuillez réessayer."); // définir l'erreur de chargement
      });
  }, [userId]);

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

  const shouldShowWelcomeMessage = welcomeMessageVisible || location.pathname !== "/" || paramUserId;

  return (
    <div className="home">
      {loadingError && <div>Erreur lors du chargement des données. Veuillez réessayer.</div>} 
      {!shouldShowWelcomeMessage && (
        <div className="welcome-choice-div">
          <h1 className="id-choice-question">Bienvenue !</h1>
          <h2 className="id-choice-question-h2">Cliquez sur l'une des options ci-dessous pour découvrir les performances de chaque utilisateur et leurs réalisations. </h2>
          <p className="id-choice-question-p"> Une fois votre choix effectué, vous serez redirigé vers les données correspondantes.</p>
          <p>Choisissez votre utilisateur : </p>
          <div className="button">
            <Link to="/user/12" className={`button-choice ${userId === 12 ? 'active' : ''}`} onClick={() => handleUserClick(12)}>
              Karl ⛹🏼‍♂️ 
            </Link>
            <Link to="/user/18" className={`button-choice ${userId === 18 ? 'active' : ''}`} onClick={() => handleUserClick(18)}>
              Cecilia 🏄🏼‍♀️ 
            </Link>
          </div>
        </div>
      )}

      {shouldShowWelcomeMessage && userData && (
        <div>
          <div className="welcome-div"> 
            <div> 
              <span className="welcome">Bonjour, </span> 
              <span className="first-name">{userData.userInfos.firstName}</span>
            </div>
            <span className="congradulation">Félicitation ! Vous avez explosé vos objectifs hier 👏</span>
          </div>

          <div className="container">
            <div className="row"> 
              <div className="garph-container"> 
                <Graphique userId={userId} /> 
              </div>
              <div className="nutri-container"> 
                <Nutrients userId={userId}/> 
              </div>
            </div>
            <div className="row-bottom"> 
              <div className="line-chart">
                <Linechart userId={userId}/>
              </div>
              <div className="radar-chart">
                <Radarchart userId={userId}/>
              </div>
              <div className="radial-chart">
                <Radialchart userId={userId}/>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
