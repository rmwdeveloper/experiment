import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Projects.css'; //eslint-disable-line
import { connect } from 'react-redux';

import ProjectGridItem from '../../components/Projects/ProjectGridItem';

@connect(state => ({
  professionalProjects: state.projects.professionalProjects,
  personalProjects: state.projects.personalProjects,
}), { })
class Projects extends Component { //eslint-disable-line
  static propTypes = {
    professionalProjects: PropTypes.array,
    personalProjects: PropTypes.array,
  };

  render() {
    const { professionalProjects, personalProjects } = this.props;
    return (<div className={styles.root}>
      {
        professionalProjects.map((professionalProject, index) => {
          return <ProjectGridItem  key={index} project={professionalProject} />;
        })
      }
      {
        personalProjects.map((professionalProject, index) => {
          return <ProjectGridItem key={index} project={professionalProject} />;
        })
      }
    </div>);
  }
}

export default withStyles(styles)(Projects);
