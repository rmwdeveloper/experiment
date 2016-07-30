import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './WindowsDesktop.css'; //eslint-disable-line

function WindowsDesktop({ className }) {
  return (
    <div className={styles.root}>
      Windows Desktop
    </div>
  );
}

WindowsDesktop.propTypes = {

};
export default withStyles(styles)(WindowsDesktop);
