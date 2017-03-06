import React from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './front.css'; //eslint-disable-line

function Front({}) {

  return <div className={styles.root}>front</div>;
}


export default withStyles(styles)(Front);
