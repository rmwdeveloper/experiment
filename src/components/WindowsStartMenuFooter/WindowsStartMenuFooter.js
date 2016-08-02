import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './WindowsStartMenuFooter.css'; //eslint-disable-line

import logoffIcon from './xpLogoffIcon.png';
import shutdownIcon from './xpShutdownButton.png';
class WindowsStartMenuFooter extends Component {
  render() {
    return (
      <div className={styles.root}>
        <div className={styles.footerButton}>
          <img src={logoffIcon} height="33" width="33" alt="Small key" />
          <span>Log Off</span>
        </div>
        <div className={styles.footerButton}>
          <img src={shutdownIcon} height="33" width="33" alt="Circle with vertical line in center" />
          <span>Turn Off Computer</span>
        </div>
      </div>
    );
  }
}

WindowsStartMenuFooter.propTypes = {

};
export default withStyles(styles)(WindowsStartMenuFooter);
// todo: convert footer buttons to actual button elements