import React from 'react';
import fetch from '../../core/fetch';
import StockDashboard from './StockDashboard';
import StockHomepage from '../../components/StockHomepage';
import StockSearch from '../../components/StockSearch';
import StockDetail from '../../components/StockDetail';


export default {
  path: '/stocks',
  children: [
    {
      path: '/',
      async action() { return <StockHomepage />; }
    },
    {
      path: '/search',
      async action() { return <StockSearch />; }
    },
    {
      path: '/stocks/:identifier',
      async action() { return <StockDetail />; }

    }
  ],
  async action({ next, render, context }) {
    const component = await next();
    if (component === undefined) return component;
    const result = fetch('https://api.github.com/users/rmwdeveloper', {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    });
    result.then(response => {
      response.json().then(text=>{
        console.log(text);
      });
    });
    return (<StockDashboard>
      {component}
    </StockDashboard>);
  }

};
