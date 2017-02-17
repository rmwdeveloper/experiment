import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './PricingAndLogin.css'; //eslint-disable-line

import { connect } from 'react-redux';
import shallowCompare from 'react-addons-shallow-compare';


@connect(state => ({
}), {})
class PricingAndLogin extends Component { //eslint-disable-line
  static propTypes = {

  };
  render() {
    return <div>Hello World!</div>
  }
}

export default withStyles(styles)(PricingAndLogin);
