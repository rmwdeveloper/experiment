import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './StockHomepage.css'; //eslint-disable-line
import StockSearch from '../StockSearch';
import StockListingBlock from '../StockListingBlock';

function StockHomepage() {
  return (
    <div>
      <StockSearch />
      <StockListingBlock />
    </div>
  );
}

export default withStyles(styles)(StockHomepage);
