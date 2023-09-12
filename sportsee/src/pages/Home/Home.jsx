import React, { useState, useEffect } from "react";
import { getUserData } from "../../utils/ApiService";
import Example from '../../components/chart/Graphique.jsx'; 
import Nutrients from "../../components/nutrients/Nutrients.jsx";
import Linechart from "../../components/lineChart/LineChart";
import Radarchart from "../../components/radarChart/Radarchart";
import Radialchart from "../../components/radialchart/Radialchart";
import './_Home.scss';

function Home() {
  const [userId, setUserId] = useState(12);//stocker l'ID de l'utilisateur
  const [userData, setUserData] = useState(null);//stocker les données
  const [welcomeMessageVisible, setWelcomeMessageVisible] = useState(false);//message de bienvenue

  useEffect(() => {
    getUserData(userId) //récupérer id
      .then((data) => {
        setUserData(data);//mettre à jour avec id récupéré
      })
  }, [userId]);//le faire à chaque fois que userId change

  const handleUserClick = (id) => {
    setUserId(id);
    setWelcomeMessageVisible(true);//afficher message
  };

return (
  <div className="home">
    {!welcomeMessageVisible && <h1 className="id-choice-question">Veuillez choisir un utilisateur.</h1>}
    {!welcomeMessageVisible && (
      <div className="button">
        <button onClick={() => handleUserClick(12)} className="button-choice">Utilisateur ID 12</button>
        <button onClick={() => handleUserClick(18)} className="button-choice">Utilisateur ID 18</button>
      </div>
    )}
    {welcomeMessageVisible && userData && (
      <div className="welcome-div"> 
        <span className="welcome">Bonjour, </span> <span className="first-name">{userData.userInfos.firstName}</span>
        <br /><span className="congradulation">Félicitation ! Vous avez explosé vos objectifs hier 👏</span>
      </div>
    )}

    {welcomeMessageVisible && userData && (
      <div className="container">
        <div className="row"> 
          <div className="garph-container"> 
          <Example userId={userId} /> 
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
    )}
  </div>
);
}


export default Home;

