import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './WindowsQuickAccessDirectoryItem.css'; //eslint-disable-line
import cx from 'classnames';

function WindowsQuickAccessDirectoryItem({data, className}) {

  return (
    <div className={styles.root}>
      <img className={styles.icon} src={data.icon} alt={`${data.name} icon`} />
      <span className={cx(styles.directoryName, className)}> {data.name}</span>
    </div>
  );
}


WindowsQuickAccessDirectoryItem.propTypes = {};
export default withStyles(styles)(WindowsQuickAccessDirectoryItem);
