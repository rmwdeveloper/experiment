import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './WatchedStockList.css'; //eslint-disable-line
import cx from 'classnames';

function WatchedStockList({className}) {
  return (
      <div className={cx(styles.root, className)}>
        Watched STock list
      </div>
  );
}

export default withStyles(styles)(WatchedStockList);
