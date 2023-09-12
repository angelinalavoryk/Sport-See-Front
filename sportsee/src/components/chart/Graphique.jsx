import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis,CartesianGrid , Tooltip, Legend, ResponsiveContainer} from 'recharts';
import { getUserActivityData } from '../../utils/ApiService.jsx';
import './_Graphique.scss';

const formatDay = (day) => {
  const dayNumber = parseInt(day.substring(day.length - 2), 10);
  return dayNumber.toString();
};

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const kilogram = payload[0].payload.kilogram;
      const calories = payload[0].payload.calories;
      return (
        <div className="custom-tooltip">
            <div> 
          <p className="tooltip-txt">{kilogram}kg</p>
          </div>
          <div> 
          <p className="tooltip-txt">{calories}Kcla</p>
          </div>
        </div>
      );
    }
    return null;
  };

const Example = ({ userId }) => {
  const [activityData, setActivityData] = useState([]);
  const [weightData, setWeightData] = useState([]);

  useEffect(() => {
    getUserActivityData(userId)
      .then((activityData) => {
        setActivityData(activityData);
        const sortedWeightData = activityData.map((session) => session.kilogram).sort((a, b) => b - a);
        setWeightData(sortedWeightData);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données d'activité", error);
      });
  }, [userId]);

  const mappedData = activityData.map((session) => ({
    day: formatDay(session.day),
    kilogram: session.kilogram,
    calories: session.calories,
  }));

  return (
    <div className='bg'> 
    <ResponsiveContainer 
    width="100%" 
    height={320}
    >
      <BarChart
        width={500}
        height={400}
        data={mappedData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        barGap="8%"
      >
        <Legend 
        verticalAlign="top" 
        height={36} 
        iconType={"circle"} 
        align={"right"} 
        iconSize={8} 
        fontSize={14}   
        />
        <g>
            <text 
            x={30} 
            y={20} 
            className="graph-title"
            >
              Activité quotidienne
              </text>
        </g>
        <CartesianGrid 
        strokeDasharray="2 " 
        vertical={false} 
        />
        <XAxis 
          dataKey="day" 
          tickFormatter={formatDay} 
          tick={{ fill: '#9B9EAC' }}
          stroke="#D8D8D8"
          tickLine={{ display: 'none' }} 
          padding={{ top: 0, right: -42, left: -42, bottom: 0 }}
          // scale={"point"}

          />

        <YAxis className="hidden-y-axis"/>
        <Tooltip content={<CustomTooltip />} />
        <Bar 
        dataKey="kilogram" 
        name="Poids (kg)" 
        fill="#282D30"  
        barSize={7} 
        className="custom-bar kilogram-bar" 
        radius={[5, 10, 0, 0]}
        /> 
        <Bar 
        dataKey="calories" 
        name="Calories Brûlées (kCla)" 
        fill="#E60000" 
        barSize={7} 
        className="custom-bar calories-bar" 
        radius={[5, 10, 0, 0]}
        />
        <YAxis
          yAxisId="weight"
          orientation="right"
          tickCount={4}
          tickFormatter={(value) => `${value}`}
          domain={[weightData[weightData.length - 1], weightData[0]]}
          tick={{ fill: '#9B9EAC' }}
          stroke="white"
        />
      </BarChart>
    </ResponsiveContainer>
    </div>
  );
};

export default Example;
