import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './StockHomepage.css'; //eslint-disable-line

import LayoutColumn from '../LayoutColumn';



function StockHomepage({ widgets }) {
  return (
    <div className="row">
      <LayoutColumn id={0} className="col-lg-4 col-md-4 col-sm-6 col-xs-12" />
      <LayoutColumn id={1} className="col-lg-4 col-md-4 col-sm-6 col-xs-12" />
      <LayoutColumn id={2} className="col-lg-4 col-md-4 col-sm-6 col-xs-12" />
    </div>
  );
}

StockHomepage.propTypes = {
  widgets: PropTypes.array
};

export default withStyles(styles)(StockHomepage);
