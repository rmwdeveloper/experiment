import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './WindowsInfoHub.css'; //eslint-disable-line

import computerIcon from './xpComputerXSmall.png';
import SimpleTimer from '../SimpleTimer';

function WindowsInfoHub({ className }) {
  return (
    <div className={styles.root}>
      <img className={styles.infoImage} src={computerIcon} width="30" height="29" alt="My Computer Icon for taskbar" />
      <SimpleTimer />
    </div>
  );
}

WindowsInfoHub.propTypes = {

};
export default withStyles(styles)(WindowsInfoHub);
