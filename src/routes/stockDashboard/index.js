import React from 'react';
import { authenticateTradeIt } from '../../core/apis/tradeIt';
import StockDashboard from './StockDashboard';
import StockHomepage from '../../components/StockHomepage';
import StockSearch from '../../components/StockSearch';
import StockDetail from '../../components/StockDetail';


export default {
  path: '/stocks',
  // children: [
  //   {
  //     path: '/',
  //     async action() { return <StockHomepage />; }
  //   },
  //   {
  //     path: '/search',
  //     async action() { return <StockSearch />; }
  //   },
  //   {
  //     path: '/stocks/:identifier',
  //     async action() { return <StockDetail />; }
  //
  //   }
  // ],
  async action({ next, render, context }) {

    return <StockDashboard />;
  }

};
