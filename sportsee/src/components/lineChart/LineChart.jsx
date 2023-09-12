import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts';
import './_LineChart.scss';
import { getUserAverageSessions } from '../../utils/ApiService';

const Linechart = ({ userId }) => {
  const [averageSessions, setAverageSessions] = useState([]);
  const daysOfWeek = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

  useEffect(() => {
    getUserAverageSessions(userId)
      .then((sessions) => {
        setAverageSessions(sessions);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données de durée moyenne de séance", error);
      });
  }, [userId]);

  const chartData = averageSessions.map((session) => ({
    day: daysOfWeek[session.day - 1],
    sessionLength: session.sessionLength,
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-dialog-line">
          <p className="txt-custom-dialog-line">{`${payload[0].value} min`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <>
    <div className='bg-graphique-line'> 
    <div className='txt-graphique-line'> <p className='txt-p-graphique-line'>Durée moyenne des <br /> sessions</p></div>
    <ResponsiveContainer width="100%" height={170}>
      <LineChart
        className='custom-line-chart'
        // width={500}
        // height={300}
        data={chartData}
      >
<svg width="0" height="0">
  <linearGradient id="colorLineChart" x1="0%" y1="0" x2="100%" y2="0">
    <stop offset="0%" stopColor="rgba(255, 255, 255, 0.3)" />
    <stop offset="20%" stopColor="rgba(255, 255, 255, 0.4)" />
    <stop offset="40%" stopColor="rgba(255, 255, 255, 0.5)" />
    <stop offset="60%" stopColor="rgba(255, 255, 255, 0.6)" />
    <stop offset="100%" stopColor="rgba(255, 255, 255, 1)" />
  </linearGradient>
</svg>

        <XAxis
          dataKey="day"
          tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: '12px', }} 
          axisLine={{ strokeOpacity: 0, display: 'none' }} 
          tickLine={{ display: 'none' }} 
          padding={{ left: 5, right: 5 }}
          // tickMargin={-40}
        />
        <YAxis hide domain={['dataMin-10', 'dataMax+25']} />
        <Tooltip cursor={false} content={<CustomTooltip />} />
        <Line type="natural" stroke="url(#colorLineChart)" dataKey="sessionLength"  strokeWidth={2} 
        activeDot={{
							stroke: '#FFF',
							strokeWidth: 4,
							r: 2,
						}}
            dot={false} />
      </LineChart>
    </ResponsiveContainer>
    </div>
    </>
  );
};

export default Linechart;






