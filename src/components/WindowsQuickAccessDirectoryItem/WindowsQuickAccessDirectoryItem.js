import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './WindowsQuickAccessDirectoryItem.css'; //eslint-disable-line

function WindowsQuickAccessDirectoryItem({name, data}) {

  return (
    <div className={styles.root}>
      <img src={data.icon} alt={`${name} icon`} />
      <span className={styles.directoryName}></span>
    </div>
  );
}


WindowsQuickAccessDirectoryItem.propTypes = {};
export default withStyles(styles)(WindowsQuickAccessDirectoryItem);
