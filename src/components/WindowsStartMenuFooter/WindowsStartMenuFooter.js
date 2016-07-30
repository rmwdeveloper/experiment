import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './WindowsStartMenuFooter.css'; //eslint-disable-line

import logoffIcon from './xpLogoffIcon.png';
import shutdownIcon from './xpShutdownButton.png';
class WindowsStartMenuFooter extends Component {

  render() {
    return (
      <div className={styles.root}>
        <img src={logoffIcon} height="33" width="33" alt="Small key" />
        <img src={shutdownIcon} height="33" width="33" alt="Circle with vertical line in center" />
      </div>
    );
  }
}

WindowsStartMenuFooter.propTypes = {

};
export default withStyles(styles)(WindowsStartMenuFooter);
