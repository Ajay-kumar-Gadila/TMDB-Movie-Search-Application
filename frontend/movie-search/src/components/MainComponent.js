import React, { useState } from 'react';
import TrendingToday from './TrendingToday'; // Import the TrendingToday component
import TrendingWeek from './TrendingWeek'; // Import the TrendingWeek component

function MainComponent() {
  const [activeTab, setActiveTab] = useState('today'); // 'today' or 'week'

  const showTrendingToday = () => {
    setActiveTab('today');
  };

  const showTrendingWeek = () => {
    setActiveTab('week');
  };

  return (
    <div>
      <ToggleButton showTrendingToday={showTrendingToday} showTrendingWeek={showTrendingWeek} />
      {activeTab === 'today' ? <TrendingToday /> : <TrendingWeek />}
    </div>
  );
}

export default MainComponent;
