
import React, { useEffect, useState } from 'react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer,
} from 'recharts';
import { getUserPerformanceData } from '../../services/ApiService'; 
import './_Radarchart.scss';

const Radarchart = ({ userId }) => {
  const [performanceData, setPerformanceData] = useState([]);
  const [loadingError, setLoadingError] = useState(null); 


  useEffect(() => {
    getUserPerformanceData(userId)
      .then((data) => {
        if (data && data.data) {
          const translations = {
            0: 'Cardio',
            1: 'Énergie',
            2: 'Endurance',
            3: 'Force',
            4: 'Vitesse',
            5: 'Intensité',
          };

          const formattedData = Object.keys(data.data)
            .map((key) => ({
              subject: translations[key],
              value: data.data[key].value,
            }))
            .sort((a, b) => getSortOrder(a.subject, b.subject));
          setPerformanceData(formattedData);
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données de performance", error);
        setLoadingError("Erreur lors du chargement.Les données d'activité sont introuvables pour cet utilisateur.");
      });
  }, [userId]);

  const getSortOrder = (a, b) => {
    const order = ['Intensité', 'Vitesse', 'Force', 'Endurance', 'Énergie', 'Cardio'];
    return order.indexOf(a) - order.indexOf(b);
  };

  return (
    <div className="radar-chart-container">
       {loadingError ? ( // Afficher un message d'erreur si loadingError est défini
        <div className="error-message">
          <p className='loadingError radar'>{loadingError}</p>
        </div>
      ) : (
        <ResponsiveContainer
        width="100%" 
        height={263}
        >
        <RadarChart 
        cx="50%" 
        cy="50%" 
        outerRadius="72%" 
        data={performanceData}
        >
        <PolarGrid />
        <PolarAngleAxis 
        dataKey="subject" 
        tick={{ fontSize: 12, fill: 'white' }}
         />
        <Radar 
        name="Performance" 
        dataKey="value"  
        fill="#FF0000" 
        fillOpacity={0.8} 
        />
        </RadarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Radarchart;
