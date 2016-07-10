import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './ConsoleInput.css';


function ConsoleInput(props) {
  return <input className={`${styles.root} ${props.className}`} type="text" />;
}

export default withStyles(styles)(ConsoleInput);
