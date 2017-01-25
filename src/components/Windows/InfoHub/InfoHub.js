import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './InfoHub.css'; //eslint-disable-line

import computerIcon from './xpComputerXSmall.png'; //eslint-disable-line
import SimpleTimer from '../../SimpleTimer'; //eslint-disable-line

function InfoHub({ className }) {
  return (
    <div className={styles.root}>
      <img className={styles.infoImage} src={computerIcon} width="30" height="29" alt="My Computer Icon for taskbar" />
      <img className={styles.infoImage} src={computerIcon} width="30" height="29" alt="My Computer Icon for taskbar" />
      <SimpleTimer />
    </div>
  );
}

InfoHub.propTypes = {
  className: PropTypes.string
};
export default withStyles(styles)(InfoHub);
