import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './SimpleTimer.css'; //eslint-disable-line


function SimpleTimer({ className }) {
  return (
      <span className={styles.root}>12:03 PM</span>
  );
}

SimpleTimer.propTypes = {

};
export default withStyles(styles)(SimpleTimer);
