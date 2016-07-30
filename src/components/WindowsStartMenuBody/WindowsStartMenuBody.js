import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './WindowsStartMenuBody.css'; //eslint-disable-line

import WindowsStartMenuProgramsListing from '../WindowsStartMenuProgramsListing';
import WindowsStartMenuQuickAccess from '../WindowsStartMenuQuickAccess';

class WindowsStartMenuBody extends Component {

  render() {
    return (
      <div className={styles.root}>
        <div className={styles.left}>
          <WindowsStartMenuProgramsListing />
        </div>
        <div className={styles.right}>
          <WindowsStartMenuQuickAccess />
        </div>
      </div>
    );
  }
}

WindowsStartMenuBody.propTypes = {

};
export default withStyles(styles)(WindowsStartMenuBody);
