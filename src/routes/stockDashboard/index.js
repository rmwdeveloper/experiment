import React from 'react';
import StockDashboard from './StockDashboard';


export default {
  path: '/stocks',

  async action() {
    return <StockDashboard />;
  }

};
