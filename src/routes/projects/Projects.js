import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Projects.css'; //eslint-disable-line
import { connect } from 'react-redux';

import ProjectGridItem from '../../components/Projects/ProjectGridItem';

@connect(state => ({
  projects: state.projects.projects
}), { })
class Projects extends Component { //eslint-disable-line
  static propTypes = {
    projects: PropTypes.array
  };

  render() {
    return (<div className={styles.root}>

    </div>)
  }
}

export default withStyles(styles)(Projects);
