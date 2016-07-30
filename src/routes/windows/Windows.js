import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Windows.css'; //eslint-disable-line

import { connect } from 'react-redux';
import shallowCompare from 'react-addons-shallow-compare';

import * as windowsActions from '../../actions/windows';

import WindowsDesktop from '../../components/WindowsDesktop';
import WindowsTaskbar from '../../components/WindowsTaskbar';
import WindowsStartMenu from '../../components/WindowsStartMenu';

import cx from 'classnames';
const title = 'Windows XP';

@connect(state => ({
  startMenuOpened: state.windows.startMenuOpened,
}), { ...windowsActions })
class StockDashboard extends Component { //eslint-disable-line
  static propTypes = {
    startMenuOpened: PropTypes.bool,
    toggleStartMenu: PropTypes.func
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
    const { startMenuOpened, toggleStartMenu } = this.props;
    return (<div className={styles.root}>
      <WindowsDesktop />
      { startMenuOpened ? <WindowsStartMenu /> : null }

      <WindowsTaskbar toggleStartMenu={toggleStartMenu} />
    </div>);
  }
}

export default withStyles(styles)(StockDashboard);
