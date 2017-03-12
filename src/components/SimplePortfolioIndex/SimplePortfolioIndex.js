import React, { PropTypes, Component} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import MyContactLinks from '../MyContactLinks';
import FloatingButton from '../FloatingButton';
import ProjectRows from '../Projects/ProjectRows';

import styles from './SimplePortfolioIndex.css'; //eslint-disable-line


@connect(state => ({

}), { })
class Cube extends Component {
  constructor() {
   super();
  }

  render() {

    const proProjects =  React.createElement(ProjectRows('professional'), {...this.props}); ;
    const personalProjects =  React.createElement(ProjectRows('personal'), {...this.props}); ;

    return <div className={styles.root}>
      <div className={styles.bigHeader}>
        <h1> Robert Westenberger </h1>
        <h3> Full Stack Developer </h3>
        <MyContactLinks />
        <FloatingButton />
      </div>
      {proProjects}
      {personalProjects}
    </div>
  }
}


export default withStyles(styles)(Cube);
