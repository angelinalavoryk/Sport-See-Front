import React from "react";
import { Link } from "react-router-dom";

function UserSelector({ userId, handleUserClick }) {
  return (
    <div className="welcome-choice-div">
      <h1 className="id-choice-question">Bienvenue !</h1>
      <h2 className="id-choice-question-h2">
        Cliquez sur l'une des options ci-dessous pour découvrir les performances de chaque utilisateur et leurs réalisations.{" "}
      </h2>
      <p className="id-choice-question-p">
        Une fois votre choix effectué, vous serez redirigé vers les données correspondantes.
      </p>
      <p>Choisissez votre utilisateur : </p>
      <div className="button">
        <Link to="/user/12" className={`button-choice ${userId === 12 ? "active" : ""}`} onClick={() => handleUserClick(12)}>
          Karl ⛹🏼‍♂️
        </Link>
        <Link to="/user/18" className={`button-choice ${userId === 18 ? "active" : ""}`} onClick={() => handleUserClick(18)}>
          Cecilia 🏄🏼‍♀️
        </Link>
      </div>
    </div>
  );
}

export default UserSelector;
