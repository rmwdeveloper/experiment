import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './WindowsInfoHub.css'; //eslint-disable-line

function WindowsInfoHub({ className }) {
  return (
    <div className={styles.root}>
      iwndos info uhb
    </div>
  );
}

WindowsInfoHub.propTypes = {

};
export default withStyles(styles)(WindowsInfoHub);
