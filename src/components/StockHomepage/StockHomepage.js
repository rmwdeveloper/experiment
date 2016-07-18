import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './StockHomepage.css'; //eslint-disable-line

import LayoutColumn from '../LayoutColumn';
import LayoutCell from '../LayoutCell';


function StockHomepage() {
  return (
    <div className="row">
      <LayoutColumn className="col-lg-4 col-md-4 col-sm-6 col-xs-12" />
      <LayoutColumn className="col-lg-4 col-md-4 col-sm-6 col-xs-12" />
      <LayoutColumn className="col-lg-4 col-md-4 col-sm-6 col-xs-12" />
    </div>
  );
}

export default withStyles(styles)(StockHomepage);
