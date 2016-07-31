import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './WindowsStartMenuQuickAccess.css'; //eslint-disable-line

import WindowsQuickAccessDirectoryItem from '../WindowsQuickAccessDirectoryItem';

function WindowsStartMenuQuickAccess({userDirectories, utilityControls}) {

  return (
    <div className={styles.root}>
      <div className={styles.userDirectories}>
        { Object.keys(userDirectories).map(directoryName => {
          return <WindowsQuickAccessDirectoryItem name={directoryName} data={userDirectories[directoryName]} />
        })}
      </div>
      <div className={styles.utilityControls}>
        { Object.keys(utilityControls).map(directoryName => {
          return <WindowsQuickAccessDirectoryItem name={directoryName} data={utilityControls[directoryName]} />
        })}
      </div>
    </div>
  );
}


WindowsStartMenuQuickAccess.propTypes = {};
export default withStyles(styles)(WindowsStartMenuQuickAccess);
