import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Projects.css'; //eslint-disable-line
import { connect } from 'react-redux';

@connect(state => ({

}), { })
class Projects extends Component { //eslint-disable-line
  static propTypes = {
  };

  render() {
    return <div>Projects</div>
  }
}

export default withStyles(styles)(Projects);
