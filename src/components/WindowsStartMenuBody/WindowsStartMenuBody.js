import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './WindowsStartMenuBody.css'; //eslint-disable-line

import WindowsStartMenuProgramsListing from '../WindowsStartMenuProgramsListing';
import WindowsStartMenuQuickAccess from '../WindowsStartMenuQuickAccess';

class WindowsStartMenuBody extends Component {
  static propTypes = {
    installedPrograms: PropTypes.object,
  };
  render() {
    const {installedPrograms, userDirectories, utilityControls, computerSettings} = this.props;
    return (
      <div className={styles.root}>
        <div className={styles.left}>
          <WindowsStartMenuProgramsListing installedPrograms={installedPrograms} />
        </div>
        <div className={styles.right}>
          <WindowsStartMenuQuickAccess computerSettings={computerSettings} userDirectories={userDirectories} utilityControls={utilityControls}/>
        </div>
      </div>
    );
  }
}

WindowsStartMenuBody.propTypes = {

};
export default withStyles(styles)(WindowsStartMenuBody);
