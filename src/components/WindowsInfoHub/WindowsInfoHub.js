import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './WindowsInfoHub.css'; //eslint-disable-line

function WindowsInfoHub({ className }) {
  return (
    <div className={styles.root}>
      <span className={styles.time}>12:03 PM</span>
    </div>
  );
}

WindowsInfoHub.propTypes = {

};
export default withStyles(styles)(WindowsInfoHub);
