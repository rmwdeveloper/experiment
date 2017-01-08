import React, { PropTypes, Component } from 'react';
import styles from './Authenticator.css'; //eslint-disable-line
import withStyles from 'isomorphic-style-loader/lib/withStyles';


class Authenticator extends Component {
  render() {
    return <div>Authenticator!!</div>;
  }
}

export default withStyles(styles)(Authenticator);
