import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Home.css'; //eslint-disable-line
import { connect } from 'react-redux';

import ProjectGridItem from '../../components/Projects/ProjectGridItem';

const title = 'Robert Westenberger Portfolio';

@connect(state => ({
  professionalProjects: state.projects.professionalProjects,
  personalProjects: state.projects.personalProjects,
}), { })
class Home extends Component { //eslint-disable-line
  static propTypes = {
    professionalProjects: PropTypes.array,
    personalProjects: PropTypes.array,
  };
  static contextTypes = {
    setTitle: PropTypes.func.isRequired
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

export default withStyles(styles)(Home);
