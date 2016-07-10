import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './ConsoleInput.css';
import cx from 'classNames';

function ConsoleInput(props) {
  return <input className={cx(styles.root, props.className)} type="text" />;
}

export default withStyles(styles)(ConsoleInput);
