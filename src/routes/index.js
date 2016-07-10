// Child Routes
import React from 'react';
import Home from './home/Home';
import App from '../components/App';


export default {

  path: '/',

  children: [
    {
      path: '/',
      action() {
        return <Home />;
      }
    }
  ],

  async action({ next, render, context }) {
    const component = await next();
    if (component === undefined) return component;
    return render(
        <App context={context}>{component}</App>
    );
  },

};
