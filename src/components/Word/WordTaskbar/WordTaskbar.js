import React, { PropTypes } from  'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './WordTaskbar.css'; //eslint-disable-line


function WordTaskbar({boldClick}) {
  return (<div>
    <button onClick={() => {boldClick('BOLD');}}><i className="fa fa-bold"/> </button>
  </div>);
}

WordTaskbar.propTypes = {
  boldClick: PropTypes.func.isRequired
};
export default withStyles(styles)(WordTaskbar);
