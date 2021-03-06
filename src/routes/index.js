// Child Routes
import React from 'react';
import home from './home';
import console from './console';
import stockDashboard from './stockDashboard';
import windows from './windows';
import login from './login';
import register from './register';
import projects from './projects';
import pagemaker from './pagemaker';
import App from '../components/App';


const routes = {

  path: '/',

  children: [
    home,
    console,
    stockDashboard,
    login,
    register,
    windows,
    projects,
    pagemaker
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
