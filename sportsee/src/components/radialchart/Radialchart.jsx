
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { getUserData } from '../../utils/ApiService'; 
import './_Radialchart.scss';

const Radialchart = ({ userId }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    getUserData(userId)
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données utilisateur', error);
      });
  }, [userId]);

  if (!userData) {
    return <div>Chargement en cours...</div>;
  }

  //  score en pourcentage
  const todayScorePercentage = userData.todayScore * 100;
  const remainingPercentage = 100 - todayScorePercentage;

  const chartData = [
    { name: 'Score', value: todayScorePercentage },
    { name: 'Restant', value: remainingPercentage },
  ];
  return (
    <>
      <p className="chartgoal-title">Score</p>
      <ResponsiveContainer 
      width="100%" 
      height="100%" 
      className={'radial'} >
        <PieChart className='center-txt' >
          <Pie
            data={chartData}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius="70%" //espace entre le % et le cercle
            outerRadius="80%" //espace entre le % et le cercle
            startAngle={90}
            endAngle={450}
          >
            {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} 
            fill={index === 0 ? 'red' : '#FBFBFB'} 
            cornerRadius={10} 
            stroke="#FBFBFB" 
            />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="chartgoal-label center">
        <p className="percent">{todayScorePercentage.toFixed(0)}%</p>
        <p className='pie-chart-txt'>de votre</p>
        <p className='pie-chart-txt'>objectif</p>
      </div>
    </>
  );
};

export default Radialchart;




