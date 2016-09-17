import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './StartMenuQuickAccess.css'; //eslint-disable-line

import QuickAccessDirectoryItem from '../QuickAccessDirectoryItem';

function StartMenuQuickAccess({ userDirectories, utilityControls, computerSettings }) {
  return (
    <div className={styles.root}>
      <div className={styles.userDirectories}>
        {Object.keys(userDirectories).map(directoryName => {
          return (<QuickAccessDirectoryItem
            key={directoryName}
            className={styles.userDirectoryItem}
            data={userDirectories[directoryName]}
          />);
        })}
      </div>
      <div className={styles.computerSettings}>
        {Object.keys(computerSettings).map(directoryName => {
          return <QuickAccessDirectoryItem key={directoryName} data={computerSettings[directoryName]} />
        })};
      </div>
      <div className={styles.utilityControls}>
        {Object.keys(utilityControls).map(directoryName => {
          return <QuickAccessDirectoryItem key={directoryName} data={utilityControls[directoryName]}/>
        })};
      </div>
    </div>
  );
}


StartMenuQuickAccess.propTypes = {
  userDirectories: PropTypes.array,
  utilityControls: PropTypes.array,
  computerSettings: PropTypes.array
};
export default withStyles(styles)(StartMenuQuickAccess);
