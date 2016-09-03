import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './StartButton.css'; //eslint-disable-line

import xpLogo from './XPLogoXSmall.png';

function StartButton({ toggleStartMenu }) {
  return (
    <div className={styles.root} onClick={toggleStartMenu}>
      <img id={styles.logoImage} src={xpLogo} width="37" height="27" alt="Windows XP Logo" />
      <span className={styles.startText}>start</span>
    </div>
  );
}

StartButton.propTypes = {
  toggleStartMenu: PropTypes.func
};
export default withStyles(styles)(StartButton);
