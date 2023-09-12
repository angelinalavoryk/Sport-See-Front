import React from 'react';
import './_Dashboard.scss';
import Linechart from '../../components/lineChart/LineChart';



const Dashboard = () => {
  return (
    <div className='dashboard'>
        <div className='test'>
          <Linechart/>
        </div>
    </div>
  );
};

export default Dashboard;






