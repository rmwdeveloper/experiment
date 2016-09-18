import React, { PropTypes } from  'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './WordTaskbar.css'; //eslint-disable-line


function WordTaskbar({boldClick}) {
  return <div>Word Taskbar</div>;
}

WordTaskbar.propTypes = {
  boldClick: PropTypes.func.isRequired
};
export default withStyles(styles)(WordTaskbar);
