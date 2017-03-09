import React, { PropTypes, Component} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';

import styles from './SimplePortfolioIndex.css'; //eslint-disable-line


@connect(state => ({

}), { })
class Cube extends Component {
  constructor() {
   super();
  }

  render() {
    return <div className={styles.root}>
      <div className={styles.bigHeader}>
        <h1> Robert Westenberger </h1>
        <h3> Full Stack Developer </h3>
      </div>
    </div>
  }
}


export default withStyles(styles)(Cube);
