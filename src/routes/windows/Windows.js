import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Windows.css'; //eslint-disable-line

import { connect } from 'react-redux';
import shallowCompare from 'react-addons-shallow-compare';

import * as windowsActions from '../../actions/windows';
import { installedProgramsSelector, userDirectoriesSelector, desktopItemsSelector,
  computerSettingsSelector, utilityControlsSelector } from '../../selectors';
import WindowsDesktop from '../../components/Windows/Desktop';
import WindowsTaskbar from '../../components/Windows/Taskbar';
import WindowsStartMenu from '../../components/Windows/StartMenu';

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
  openedFiles: state.windows.openedFiles,
  entities: state.windows.entities,
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
    openFile: PropTypes.func,
    closeFile: PropTypes.func,
    toggleWindowMaximize: PropTypes.func,
    toggleWindowMinimize: PropTypes.func,
    entities: PropTypes.object,
    dragFileWindow: PropTypes.func,
    clickTaskbarItem: PropTypes.func
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

      <WindowsTaskbar toggleStartMenu={toggleStartMenu} {...this.props} />
    </div>);
  }
}

export default withStyles(styles)(Windows);
