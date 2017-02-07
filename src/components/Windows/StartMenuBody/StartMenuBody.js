import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './StartMenuBody.css'; //eslint-disable-line

import StartMenuProgramsListing from '../StartMenuProgramsListing';
import StartMenuQuickAccess from '../StartMenuQuickAccess';

class StartMenuBody extends Component {
  static propTypes = {
    installedPrograms: PropTypes.object,
  };
  render() {
    const {installedPrograms, userDirectories, utilityControls, computerSettings} = this.props;
    return (
      <div className={styles.root}>
        <div className={styles.left}>
          <StartMenuProgramsListing {...this.props} />
        </div>
        <div className={styles.right}>
          <StartMenuQuickAccess {...this.props} computerSettings={computerSettings} userDirectories={userDirectories} utilityControls={utilityControls}/>
        </div>
      </div>
    );
  }
}

StartMenuBody.propTypes = {
  installedPrograms: PropTypes.array,
  userDirectories: PropTypes.array,
  utilityControls: PropTypes.array,
  computerSettings: PropTypes.array,
};
export default withStyles(styles)(StartMenuBody);
