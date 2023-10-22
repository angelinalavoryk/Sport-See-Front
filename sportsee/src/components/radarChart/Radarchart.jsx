import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import './_Radarchart.scss';


export const performanceNamesInOrder = [
  'Intensité',
  'Vitesse',
  'Force',
  'Endurance',
  'Énergie',
  'Cardio',
];

const Radarchart = ({ performanceData }) => {
  return (
    <div className="radar-chart-container">
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
   
    </div>
  );
};

export default Radarchart;
