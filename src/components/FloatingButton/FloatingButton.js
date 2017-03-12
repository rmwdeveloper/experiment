import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './FloatingButton.css'; //eslint-disable-line


function FloatingButton({}) {

  return (
    <div className={styles.root}>
      floating button
    </div>
  );
}

export default withStyles(styles)(FloatingButton);
