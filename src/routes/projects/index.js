import React from 'react';
import Projects from './Projects';


export default {
  path: '/projects',

  async action() {
    return <Projects />;
  }

};
