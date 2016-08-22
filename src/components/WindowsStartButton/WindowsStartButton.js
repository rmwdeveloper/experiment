import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './WindowsStartButton.css'; //eslint-disable-line

import xpLogo from './XPLogoXSmall.png';

function WindowsStartButton({ toggleStartMenu }) {
  return (
    <div className={styles.root} onClick={toggleStartMenu}>
      <img id={styles.logoImage} src={xpLogo} width="37" height="27" alt="Windows XP Logo" />
      <span className={styles.startText}>start</span>
    </div>
  );
}

WindowsStartButton.propTypes = {
  toggleStartMenu: PropTypes.func
};
export default withStyles(styles)(WindowsStartButton);
