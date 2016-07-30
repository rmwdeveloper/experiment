import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './WindowsStartButton.css'; //eslint-disable-line

import xpLogo from './XPLogoXSmall.png';

function WindowsStartButton({ className }) {
  return (
    <div className={styles.root}>
      <img src={xpLogo} width="37" height="27" alt="Windows XP Logo" />
      <span className={styles.startText}>start</span>
    </div>
  );
}

WindowsStartButton.propTypes = {

};
export default withStyles(styles)(WindowsStartButton);
