import React, { PropTypes } from 'react';
import styles from './Authenticator.css'; //eslint-disable-line
import withStyles from 'isomorphic-style-loader/lib/withStyles';


function Authenticator({}) {
  return <div>Authenticator!!</div>;
}

Authenticator.propTypes = {
  entityID: PropTypes.number
};
export default withStyles(styles)(Authenticator);
