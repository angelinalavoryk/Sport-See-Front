import React from 'react';
import { BarChart, Bar, XAxis,  YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './_BarChart.scss';


export const formatDay = (day) => {

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

const Barchart = ({ activityData }) => {
  
  return (
    <div className='bg'>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          width={500}
          height={400}
          data={activityData}
          margin={{ top: 5, right: 50, left: -20, bottom: 20 }}
          barGap="8%"
          className="chart-container"
        >
          <Legend 
            verticalAlign="top" 
            height={80} 
            iconType={"circle"} 
            align={"right"} 
            iconSize={8} 
            fontSize={14}
          />
          <g className='g' style={{ marginLeft: '80px' }}>
            <text 
              x={30} 
              y={20} 
              color='red'
              className="graph-title"
              >
              Activité quotidienne
            </text>
          </g>
          <CartesianGrid 
            strokeDasharray="2" 
            vertical={false} 
          />
          <XAxis 
            dataKey="day" 
            tickFormatter={formatDay} 
            tick={{ fill: '#9B9EAC' }}
            stroke="#D8D8D8"
            tickLine={{ display: 'none' }} 
            padding={{ top: 0, right: -42, left: -42, bottom: 0 }}
          />
          <YAxis 
            yAxisId="kilogramAxis" 
            orientation="right"
            tickCount={4}
            tickFormatter={(value) => `${value}`}
            domain={['dataMin - 2', 'dataMax + 1']} 
            tick={{ fill: '#9B9EAC' }} 
            stroke="white" 
            dx={40} // Espace entre le graphique et l'axe
          />            
          <YAxis 
            className="hidden-y-axis"
            yAxisId="caloriesAxis" 
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="kilogram" 
            name="Poids (kg)" 
            fill="#282D30"  
            barSize={7} 
            className="custom-bar kilogram-bar" 
            radius={[5, 10, 0, 0]}
            yAxisId="kilogramAxis"
          /> 
          <Bar 
            dataKey="calories" 
            name="Calories Brûlées (kCla)" 
            fill="#E60000" 
            barSize={7} 
            className="custom-bar calories-bar" 
            radius={[5, 10, 0, 0]}
            yAxisId="caloriesAxis"
          />
        </BarChart>

      </ResponsiveContainer>
    </div>
  );
};

export default Barchart;
