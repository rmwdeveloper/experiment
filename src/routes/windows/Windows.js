import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Windows.css'; //eslint-disable-line

import { connect } from 'react-redux';
import shallowCompare from 'react-addons-shallow-compare';

import * as windowsActions from '../../actions/windows';

import WindowsDesktop from '../../components/WindowsDesktop';
import WindowsTaskbar from '../../components/WindowsTaskbar';

import cx from 'classnames';
const title = 'Windows XP';

@connect(state => ({

}), { ...windowsActions })
class StockDashboard extends Component { //eslint-disable-line
  static propTypes = {
  };
  static contextTypes = {
    setTitle: PropTypes.func.isRequired
  };
  constructor() {
    super();
  }

  shouldComponentUpdate(nextProps) {
    return shallowCompare(this.props, nextProps);
  }


  render() {
    return (<div className={styles.root}>
      <WindowsDesktop />
      <WindowsTaskbar />
    </div>);
  }
}

export default withStyles(styles)(StockDashboard);
