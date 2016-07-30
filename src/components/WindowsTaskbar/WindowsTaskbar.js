import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './WindowsTaskbar.css'; //eslint-disable-line

import WindowsStartButton from '../WindowsStartButton';
import WindowsInfoHub from '../WindowsInfoHub';

function WindowsTaskbar({ className }) {
  return (
    <div className={styles.root}>
      <WindowsStartButton />
      <WindowsInfoHub />
    </div>
  );
}

WindowsTaskbar.propTypes = {

};
export default withStyles(styles)(WindowsTaskbar);
