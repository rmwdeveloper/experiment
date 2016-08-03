import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Windows.css'; //eslint-disable-line

import { connect } from 'react-redux';
import shallowCompare from 'react-addons-shallow-compare';

import * as windowsActions from '../../actions/windows';
import {installedProgramsSelector, userDirectoriesSelector,
  computerSettingsSelector, utilityControlsSelector} from '../../selectors';
import WindowsDesktop from '../../components/WindowsDesktop';
import WindowsTaskbar from '../../components/WindowsTaskbar';
import WindowsStartMenu from '../../components/WindowsStartMenu';

import cx from 'classnames';
const title = 'Windows XP';

@connect(state => ({
  startMenuOpened: state.windows.startMenuOpened,
  installedPrograms: installedProgramsSelector(state),
  userDirectories: userDirectoriesSelector(state),
  utilityControls: utilityControlsSelector(state),
  computerSettings: computerSettingsSelector(state),
}), { ...windowsActions })
class Windows extends Component { //eslint-disable-line
  static propTypes = {
    installedPrograms: PropTypes.array,
    userDirectories: PropTypes.array,
    utilityControls: PropTypes.array,
    computerSettings: PropTypes.array,
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
    const { startMenuOpened, toggleStartMenu, installedPrograms } = this.props;
    return (<div className={styles.root}>
      <WindowsDesktop installedPrograms={installedPrograms} />
      { startMenuOpened ? <WindowsStartMenu installedPrograms={installedPrograms} {...this.props} /> : null }

      <WindowsTaskbar toggleStartMenu={toggleStartMenu} />
    </div>);
  }
}

export default withStyles(styles)(Windows);
