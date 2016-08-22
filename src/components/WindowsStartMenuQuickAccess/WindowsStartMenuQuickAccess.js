import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './WindowsStartMenuQuickAccess.css'; //eslint-disable-line

import WindowsQuickAccessDirectoryItem from '../WindowsQuickAccessDirectoryItem';

function WindowsStartMenuQuickAccess({ userDirectories, utilityControls, computerSettings }) {

  return (
    <div className={styles.root}>
      <div className={styles.userDirectories}>
        {Object.keys(userDirectories).map(directoryName => {
          return (<WindowsQuickAccessDirectoryItem
            key={directoryName}
            className={styles.userDirectoryItem}
            data={userDirectories[directoryName]}
          />);
        })}
      </div>
      <div className={styles.computerSettings}>
        {Object.keys(computerSettings).map(directoryName => {
          return <WindowsQuickAccessDirectoryItem key={directoryName} data={computerSettings[directoryName]}/>
        })}
      </div>
      <div className={styles.utilityControls}>
        {Object.keys(utilityControls).map(directoryName => {
          return <WindowsQuickAccessDirectoryItem key={directoryName} data={utilityControls[directoryName]}/>
        })}
      </div>
    </div>
  );
}


WindowsStartMenuQuickAccess.propTypes = {};
export default withStyles(styles)(WindowsStartMenuQuickAccess);
