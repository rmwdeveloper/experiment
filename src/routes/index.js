// Child Routes
import React from 'react';
import home from './home';
import console from './console';
import stockDashboard from './stockDashboard';
import windows from './windows';
import App from '../components/App';


const routes = {

  path: '/',

  children: [
    home,
    console,
    stockDashboard,
    windows
  ],

  async action({ next, render, context }) {
    const component = await next();
    if (component === undefined) return component;
    return render(
      <App context={context}>{component}</App>
    );
  },

};

export default routes;
