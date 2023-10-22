import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import './_Radialchart.scss';


      

const Radialchart = ({ radialChartData }) => {
  if (!radialChartData) {
    return <div>Chargement en cours...</div>;
  }  
  const { todayScorePercentage, remainingPercentage } = radialChartData;

  const chartData = [
    { name: 'Score', value: todayScorePercentage },
    { name: 'Restant', value: remainingPercentage },
  ];
  
  return (
    <>
      <p className="chartgoal-title">Score</p>
      <ResponsiveContainer width="100%" height="100%" className={'radial'}>
        <PieChart className='center-txt'>
          <Pie
            data={chartData}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius="52%"
            outerRadius="60%"
            startAngle={90}
            endAngle={450}
          >
          <Cell
            key="cell-0"
            fill="red"
            cornerRadius={10}
            stroke="#FBFBFB"
          />
          <Cell
            key="cell-1"
            fill="#FBFBFB"
            cornerRadius={10}
            stroke="#FBFBFB"
          />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="chartgoal-label center">
        <p className="percent">{todayScorePercentage}%</p>
        <p className='pie-chart-txt'>de votre</p>
        <p className='pie-chart-txt'>objectif</p>
      </div>
    </>
  );
};
export default Radialchart;


