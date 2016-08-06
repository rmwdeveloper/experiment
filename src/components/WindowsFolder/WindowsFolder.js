import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './WindowsFolder.css'; //eslint-disable-line
import cx from 'classnames';

import WindowsFileBaseTaskbar from '../WindowsFileBaseTaskbar';

//todo: refactor the base taskbar (min, resize, and close) to a HOC
function WindowsFolder({entityID}) {
  return (
    <div className={styles.root}>
      <WindowsFileBaseTaskbar />
    </div>
  );
}


WindowsFolder.propTypes = {};
export default withStyles(styles)(WindowsFolder);
