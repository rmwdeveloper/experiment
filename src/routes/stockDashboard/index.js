import React from 'react';
import StockDashboard from './StockDashboard';
import StocksHome from './StocksHome';

export default {
  path: '/stocks',
  children: {

  },
  async action() {
    return (<StockDashboard>
      <StocksHome />
    </StockDashboard>);
  }

};
