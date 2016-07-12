import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './StockSearch.css'; //eslint-disable-line
import cx from 'classnames';

function StockSearch() {
  return (
      <div className={cx(styles.root, 'row center-lg center-md center-sm center-xs')}>
        <div className="col-lg">
          <input type="search" placeholder="Search By Company Name or Ticker" />
        </div>
      </div>
  );
}

export default withStyles(styles)(StockSearch);
