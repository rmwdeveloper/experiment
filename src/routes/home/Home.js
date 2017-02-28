import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Home.css'; //eslint-disable-line
import { connect } from 'react-redux';
import * as projectsActions from '../../actions/projects';
import ProjectGridItem from '../../components/Projects/ProjectGridItem';
import Filter from '../../components/Projects/Filter';
import Carousel from '../../components/Projects/Carousel';
import { stackList } from '../../selectors';


@connect(state => ({
  professionalProjects: state.projects.professionalProjects,
  personalProjects: state.projects.personalProjects,
  stackList: stackList(state),
  selected: state.projects.selected
}), { ...projectsActions })
class Home extends Component { //eslint-disable-line
  static propTypes = {
    professionalProjects: PropTypes.array,
    personalProjects: PropTypes.array,
    stackList: PropTypes.array,
    selected: PropTypes.string,
    selectFilter: PropTypes.func
  };
  static contextTypes = {
    setTitle: PropTypes.func.isRequired
  };
  render() {
    const { personalProjects, professionalProjects } = this.props;
    const allProjects = professionalProjects.concat(personalProjects);
    return <Carousel allProjects={allProjects} {...this.props} />;
  }
  // render() {
  //   const { professionalProjects, personalProjects, stackList, selectFilter, selected } = this.props;
  //
  //   return (<div className={styles.root}>
  //     <Filter stackList={stackList} selectFilter={selectFilter} selected={selected} />
  //     {
  //       professionalProjects.map((professionalProject, index) => {
  //         return <ProjectGridItem  key={index} project={professionalProject} />;
  //       })
  //     }
  //     {
  //       personalProjects.map((professionalProject, index) => {
  //         return <ProjectGridItem key={index} project={professionalProject} />;
  //       })
  //     }
  //   </div>);
  // }
}

export default withStyles(styles)(Home);
