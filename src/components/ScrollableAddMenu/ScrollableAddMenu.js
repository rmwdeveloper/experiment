import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './ScrollableAddMenu.css'; //eslint-disable-line
import cx from 'classnames';

function ScrollableAddMenu({columnHeight}) {
  return (
      <div  style={{minHeight: `${ columnHeight / 2}rem` }} className={styles.root}>
        scrollableaddmenu
      </div>
  );
}

export default withStyles(styles)(ScrollableAddMenu);
