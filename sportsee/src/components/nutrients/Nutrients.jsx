import './_Nutrients.scss';
import Calorieicone from '../../assets/Calorieicone.svg';
import chicken from '../../assets/chicken.svg'
import apple from '../../assets/apple.svg'
import cheeseburger from '../../assets/cheeseburger.svg'
import { useEffect, useState } from 'react';
import { getUserData } from '../../services/ApiService';

const Nutrients = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [loadingError, setLoadingError] = useState(null); // gérer les erreurs de chargement

  useEffect(() => {
    getUserData(userId)
      .then(data => {
        setUserData(data);
        setLoadingError(null); // Réinitialiser l'erreur en cas de succès du chargement
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des données utilisateur", error);
        setLoadingError("Erreur lors du chargement des données. Veuillez réessayer."); // définir l'erreur de chargement
      });
  }, [userId]);

  return (
    <section className="nutrients-section">
      {userData && (
        <>
          <div className='bg-nutri'>
            <div className='bg-img bg-img-calories'>
              <img src={Calorieicone} alt="" className='icone-calorie' />
            </div>
            <div className='bg-nb-nutri-score'>
              <p className='nb nb-calories'>{userData.keyData.calorieCount + 'kCal'}</p>
              <p className='calories-txt'>Calories</p>
            </div>
          </div>

          <div className='bg-nutri'>
            <div className='bg-img bg-img-prot'>
              <img src={chicken} alt="" className='icone-calorie' />
            </div>
            <div className='bg-nb-nutri-score'>
              <p className='nb nb-prot'>{userData.keyData.proteinCount + 'kCal'}</p>
              <p className='calories-txt'>Proteines</p>
            </div>
          </div>

          <div className='bg-nutri'>
            <div className='bg-img bg-img-glucides'>
              <img src={apple} alt="" className='icone-calorie' />
            </div>
            <div className='bg-nb-nutri-score'>
              <p className='nb nb-glucides'>{userData.keyData.carbohydrateCount + 'kCal'}</p>
              <p className='calories-txt'>Glucides</p>
            </div>
          </div>

          <div className='bg-nutri'>
            <div className='bg-img bg-img-lipides'>
              <img src={cheeseburger} alt="" className='icone-calorie' />
            </div>
            <div className='bg-nb-nutri-score'>
              <p className='nb nb-lipides'>{userData.keyData.lipidCount + 'kCal'}</p>
              <p className='calories-txt'>Lipides</p>
            </div>
          </div>
        </>
      )}
      {loadingError && (
        <div className="error-message">{loadingError}</div> // Afficher le message d'erreur
      )}
    </section>
  );
};

export default Nutrients;
