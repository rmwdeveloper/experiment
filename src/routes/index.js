// Child Routes
import React from 'react';
import home from './home';
import { App } from '../containers';

export default {

  path: '/',

  children: [
    home,
  ],

  async action({ next, render, context }) {
    const component = await next();
    if (component === undefined) return component;
    return render(
        <App context={context}>{component}</App>
    );
  },

};
