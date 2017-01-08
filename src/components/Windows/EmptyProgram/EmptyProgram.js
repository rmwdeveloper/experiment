import React, { PropTypes } from 'react';
import styles from './EmptyProgram.css'; //eslint-disable-line
import withStyles from 'isomorphic-style-loader/lib/withStyles';



function EmptyProgram({}) {
  return <div>Empty Program</div>;
}

EmptyProgram.propTypes = {
  entityID: PropTypes.number
};
export default withStyles(styles)(EmptyProgram);
