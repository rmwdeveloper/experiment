import React from 'react';
import Console from './Console';


export default {
  path: '/console',

  async action() {
    return <Console />;
  }

};
