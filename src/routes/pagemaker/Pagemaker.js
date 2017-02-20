import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Pagemaker.css'; //eslint-disable-line
import { connect } from 'react-redux';



@connect(state => ({

}), { })
class Pagemaker extends Component { //eslint-disable-line
  static propTypes = {

  };

  render() {
    return (<div className={styles.root}>
      Pagemaker
    </div>);
  }
}

export default withStyles(styles)(Pagemaker);
