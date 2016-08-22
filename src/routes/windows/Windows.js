import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Windows.css'; //eslint-disable-line

import { connect } from 'react-redux';
import shallowCompare from 'react-addons-shallow-compare';

import * as windowsActions from '../../actions/windows';
import { installedProgramsSelector, userDirectoriesSelector, desktopItemsSelector,
  computerSettingsSelector, utilityControlsSelector } from '../../selectors';
import WindowsDesktop from '../../components/WindowsDesktop';
import WindowsTaskbar from '../../components/WindowsTaskbar';
import WindowsStartMenu from '../../components/WindowsStartMenu';

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
  selectedDesktopIcons: state.windows.selectedDesktopIcons,
  openedFiles: state.windows.openedFiles
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
    openContextMenu: PropTypes.func,
    clearActives: PropTypes.func,
    createFolder: PropTypes.func,
    openedFiles: PropTypes.array,
    openFile: PropTypes.func
  };
  static contextTypes = {
    setTitle: PropTypes.func.isRequired
  };

  shouldComponentUpdate(nextProps) {
    return shallowCompare(this.props, nextProps);
  }


  render() {
    const { startMenuOpened, toggleStartMenu, installedPrograms, clearActives } = this.props;
    return (<div className={styles.root} onClick={clearActives} >
      <WindowsDesktop {...this.props} />
      {startMenuOpened ? <WindowsStartMenu installedPrograms={installedPrograms} {...this.props} />
        : null}

      <WindowsTaskbar toggleStartMenu={toggleStartMenu} />
    </div>);
  }
}

export default withStyles(styles)(Windows);
