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
import MobileTaskbar from '../../components/Windows/MobileTaskbar';

@connect(state => ({
  startMenuOpened: state.windows.startMenuOpened,
  installedPrograms: installedProgramsSelector(state),
  userDirectories: userDirectoriesSelector(state),
  utilityControls: utilityControlsSelector(state),
  computerSettings: computerSettingsSelector(state),
  desktopItems: desktopItemsSelector(state),
  fileSystem: state.windows.fileSystem,
  contextMenuX: state.windows.contextMenuX,
  contextMenuY: state.windows.contextMenuY,
  contextMenuClickClass: state.windows.contextMenuClickClass,
  contextMenuIndexClicked: state.windows.contextMenuIndexClicked,
  contextMenuActive: state.windows.contextMenuActive,
  selectedDesktopIcons: state.windows.selectedDesktopIcons,
  openedFiles: state.windows.openedFiles,
  errorWindows: state.windows.errorWindows,
  entities: state.windows.entities,
  browserWidth: state.windows.browserWidth,
  browserHeight: state.windows.browserHeight,
  desktopWidth: state.windows.browserWidth,
  desktopHeight: state.windows.browserHeight
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
    contextMenuClickClass: PropTypes.string,
    contextMenuIndexClicked: PropTypes.number,
    contextMenuActive: PropTypes.bool,
    selectedDesktopIcons: PropTypes.array,
    selectIcons: PropTypes.func,
    openContextMenu: PropTypes.func,
    openErrorWindow: PropTypes.func,
    closeErrorWindow: PropTypes.func,
    clearActives: PropTypes.func,
    createFolder: PropTypes.func,
    openedFiles: PropTypes.array,
    errorWindows: PropTypes.array,
    openFile: PropTypes.func,
    closeFile: PropTypes.func,
    toggleWindowMaximize: PropTypes.func,
    toggleWindowMinimize: PropTypes.func,
    fileSystem: PropTypes.object,
    dragFileWindow: PropTypes.func,
    resizeFileWindow: PropTypes.func,
    resizeBrowserWidth: PropTypes.func,
    clickTaskbarItem: PropTypes.func,
    browserWidth: PropTypes.number,
    browserHeight: PropTypes.number,
    desktopWidth: PropTypes.number,
    desktopHeight: PropTypes.number
  };
  static contextTypes = {
    setTitle: PropTypes.func.isRequired
  };

  shouldComponentUpdate(nextProps) {
    return shallowCompare(this.props, nextProps);
  }
  componentDidMount() {
    this.props.initializeBrowserDimensions(window.innerWidth, window.innerHeight);
  }
  render() {
    const { startMenuOpened, toggleStartMenu, installedPrograms, clearActives } = this.props;
    return (<div className={styles.root} onClick={clearActives} >
      <WindowsDesktop {...this.props} />
      {startMenuOpened  && this.props.browserWidth > 767 ? <WindowsStartMenu installedPrograms={installedPrograms} {...this.props} />
        : null}
      { this.props.browserWidth > 767 ? <WindowsTaskbar toggleStartMenu={toggleStartMenu} {...this.props} /> :
        <MobileTaskbar toggleStartMenu={toggleStartMenu} {...this.props} />
      }

    </div>);
  }
}

export default withStyles(styles)(Windows);
