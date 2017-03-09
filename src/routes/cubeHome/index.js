import React from 'react';
import Home from './CubeHome';


export default {
  path: '/cubehome',

  async action() {
    return <CubeHome />;
  }

};
