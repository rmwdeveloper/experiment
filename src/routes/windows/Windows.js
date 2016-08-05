import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Windows.css'; //eslint-disable-line

import { connect } from 'react-redux';
import shallowCompare from 'react-addons-shallow-compare';

import * as windowsActions from '../../actions/windows';
import {installedProgramsSelector, userDirectoriesSelector, desktopItemsSelector,
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
  desktopItems: desktopItemsSelector(state),
  contextMenuX: state.windows.contextMenuX,
  contextMenuY: state.windows.contextMenuY,
  contextMenuActive: state.windows.contextMenuActive,
  selectedDesktopIcons: state.windows.selectedDesktopIcons
}), { ...windowsActions })
class Windows extends Component { //eslint-disable-line
  static propTypes = {
    installedPrograms: PropTypes.array,
    userDirectories: PropTypes.array,
    utilityControls: PropTypes.array,
    computerSettings: PropTypes.array,
    desktopItems: PropTypes.array,
    startMenuOpened: PropTypes.bool,
    toggleStartMenu: PropTypes.func,
    contextMenuX: PropTypes.number,
    contextMenuY: PropTypes.number,
    contextMenuActive: PropTypes.bool,
    selectedDesktopIcons: PropTypes.array,
    selectIcons: PropTypes.func,
    openContextMenu: PropTypes.func
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
    const { startMenuOpened, toggleStartMenu, installedPrograms, desktopItems } = this.props;
    return (<div className={styles.root} >
      <WindowsDesktop {...this.props} />
      { startMenuOpened ? <WindowsStartMenu installedPrograms={installedPrograms} {...this.props} /> : null }

      <WindowsTaskbar toggleStartMenu={toggleStartMenu} />
    </div>);
  }
}

export default withStyles(styles)(Windows);
