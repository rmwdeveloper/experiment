import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './WatchList.css'; //eslint-disable-line
import StockSearch from '../StockSearch';
import WatchTable from '../WatchTable';
import cx from 'classnames';

function WatchList() {
  return (
    <div className={cx(styles.root, 'row')}>
      <StockSearch className="col-lg-12 col-md-12 col-sm-12 col-xs-12" />
      <WatchTable className="col-lg-12 col-md-12 col-sm-12 col-xs-12" />
    </div>
  );
}

export default withStyles(styles)(WatchList);
