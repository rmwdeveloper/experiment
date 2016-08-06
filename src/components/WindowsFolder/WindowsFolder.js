import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './WindowsFolder.css'; //eslint-disable-line
import cx from 'classnames';

function WindowsFolder({data, className}) {

  return (
    <div className={styles.root}>
      <img className={styles.icon} src={data.icon} alt={`${data.name} icon`} />
      <span className={cx(styles.directoryName, className)}> {data.name}</span>
    </div>
  );
}


WindowsFolder.propTypes = {};
export default withStyles(styles)(WindowsFolder);
