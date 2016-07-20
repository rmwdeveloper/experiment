import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './ScrollableAddMenu.css'; //eslint-disable-line
import cx from 'classnames';

function ScrollableAddMenu() {
  return (
      <div className={styles.root}>
        scrollableaddmenu
      </div>
  );
}

export default withStyles(styles)(ScrollableAddMenu);
