import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Desktop.css'; //eslint-disable-line

import windowsFileRegistry from '../windowsFileRegistry';
import { windowsClickables } from '../../../constants/windows';
import DesktopItem from '../DesktopItem';
import ContextMenu from '../ContextMenu';


class Desktop extends Component {
  static propTypes = {
    contextMenuActive: PropTypes.bool,
    contextMenuX: PropTypes.number,
    contextMenuY: PropTypes.number,
    openContextMenu: PropTypes.func,
    openedFiles: PropTypes.array,
    selectIcons: PropTypes.func,
    desktopItems: PropTypes.array,
    createFolder: PropTypes.func,
    openFile: PropTypes.func,
    closeFile: PropTypes.func,
    toggleWindowMaximize: PropTypes.func,
    toggleWindowMinimize: PropTypes.func,
    unselectedIcons: PropTypes.array,
    dragFileWindow: PropTypes.func
  };
  constructor() {
    super();
    this.startDragSelect = this.startDragSelect.bind(this);
    this.stopDragSelect = this.stopDragSelect.bind(this);
    this.startDragFileWindow = this.startDragFileWindow.bind(this);
    this.dragFileWindow = this.dragFileWindow.bind(this);
    this.stopDragFileWindow = this.stopDragFileWindow.bind(this);
    this.dragSelecting = this.dragSelecting.bind(this);
    this.checkForOverlap = this.checkForOverlap.bind(this);
    this.desktopContextMenu = this.desktopContextMenu.bind(this);
    this.desktopMouseUp = this.desktopMouseUp.bind(this);
    this.desktopMouseDown = this.desktopMouseDown.bind(this);
    this.dragbox = null;
    this.icons = [];
    this.selectedIcons = [];
    this.diffNodeLists = this.diffNodeLists.bind(this);
    this.state = {
      dragSelecting: false,
      draggingFileWindow: false,
      dragStartX: null,
      dragStartY: null,
      fileWindowDragStartX: null,
      fileWindowDragStartY: null,
      desktopWidth: null,
      desktopHeight: null,
      itemDragged: null,
      headerHeight: null
    };
  }
  componentDidMount() {
    this.icons = document.getElementsByClassName('desktopIcon');
    this.desktop = document.getElementById('desktop');
    this.header = document.getElementById('primaryHeader');
    this.desktop.onmousedown = this.desktopMouseDown;
    this.desktop.onmouseup = this.desktopMouseUp;
    window.onresize = this.desktopResize.bind(this);
    this.setState({desktopWidth: this.desktop.offsetWidth,
      desktopHeight: this.desktop.offsetHeight,
      headerHeight: this.header.offsetHeight});
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (this.state.selectedIcons !== nextState.selectedIcons) ||
      this.state.desktopWidth !== nextState.desktopWidth ||
      this.state.desktopHeight !== nextState.desktopHeight ||
      (this.props.contextMenuActive !== nextProps.contextMenuActive) ||
      (this.props.contextMenuX !== nextProps.contextMenuX)||
      (this.props.openedFiles !== nextProps.openedFiles) ||
      (this.props.contextMenuY !== nextProps.contextMenuY);
  }
  diffNodeLists(firstNodeList, secondNodeList) {
    const iconsArray = [].slice.call(firstNodeList);
    const selectedArray = [].slice.call(secondNodeList);
    return iconsArray.filter(icon => {
      return selectedArray.indexOf(icon) < 0;
    });
  }
  desktopMouseDown(event) {
    const { clickclass } = event.target.dataset;
    if (event.button === 2) { // Right mouse button clicked
      return null;
    }
    switch (clickclass) {
      case windowsClickables.fileResizeHandle:
        console.log(' trying to resize window!');
        break;
      case windowsClickables.desktop:
        this.startDragSelect(event);
        break;
      case windowsClickables.fileTaskbar:
        this.startDragFileWindow(event);
        break;
      case windowsClickables.desktopItem:
        break;
      case windowsClickables.desktopItemIcon:
        break;

      default:

    }
  }
  desktopMouseUp(event) {
    const { clickclass } = event.target.dataset;
    const { dragSelecting, draggingFileWindow} = this.state;
    if (dragSelecting) {
      this.stopDragSelect(event);
    } else if (draggingFileWindow) {
     this.stopDragFileWindow(event);
    }
    switch (clickclass) {
      case windowsClickables.desktopItem:
        break;
      case windowsClickables.desktopItemIcon:
        break;
      default:
        // console.log(event.currentTarget);
    }
  }
  startDragSelect(event) {
    const { headerHeight } = this.state;
    this.props.clearActives();
    this.dragbox = document.getElementById('dragbox');
    if (!this.dragbox) {
      this.dragbox = document.createElement('div');
      this.dragbox.setAttribute('id', 'dragbox');
      this.desktop.appendChild(this.dragbox);
      this.dragbox.style.border = '1px dashed black';
      this.dragbox.style.position = 'absolute';
    }


    this.dragbox.style.top = `${event.clientY - headerHeight}px`;
    this.dragbox.style.left = `${event.clientX}px`;
    this.dragbox.style.width = '10px';
    this.dragbox.style.height = '10px';
    this.desktop.addEventListener('mousemove', this.dragSelecting);

    this.setState({
      dragStartX: event.clientX,
      dragStartY: event.clientY,
      dragSelecting: true
    });
    this.checkForOverlap();
  }
  stopDragSelect() {
    const { selectIcons } = this.props;
    this.desktop.removeEventListener('mousemove', this.dragSelecting);

    if (this.dragbox) {
      this.setState({
        dragSelecting: false,
        dragStartX: null,
        dragStartY: null
      });
      selectIcons(this.selectedIcons);
      this.dragbox.remove();
      this.dragbox.border = 'none';
      this.dragbox.width = '1px';
      this.dragbox.height = '1px';
      this.dragbox.transform = 'none';
      this.dragbox.left = 0;
      this.dragbox.top = 0;
    }
  }

  checkForOverlap() {
    const dragboxRect = this.dragbox.getBoundingClientRect();
    this.selectedIcons = [];
    for (let i = 0; i < this.icons.length; i++) {
      this.icons[i].style.backgroundColor = 'transparent';
      this.icons[i].style.outline = 'none';
      const icon = this.icons[i].getBoundingClientRect();
      const overlapping = !(dragboxRect.right < icon.left ||
      dragboxRect.left > icon.right ||
      dragboxRect.bottom < icon.top ||
      dragboxRect.top > icon.bottom);

      if ( overlapping ) {
        this.icons[i].style.backgroundColor = 'rgba(66,85,101,0.25)';
        this.icons[i].style.outline = '2px solid rgb(115, 128, 140)';
        this.selectedIcons.push(this.icons[i]);
      }
    }
  }
  desktopContextMenu(event) {
    const { headerHeight } = this.state;
    event.preventDefault();
    this.props.openContextMenu(event.clientX, event.clientY - headerHeight);
  }
  desktopResize() {
    this.setState({desktopWidth: this.desktop.offsetWidth, desktopHeight: this.desktop.offsetHeight});
  }
  dragSelecting(event) {
    const deltaX = event.clientX - this.state.dragStartX;
    const deltaY = event.clientY - this.state.dragStartY;

    if ( deltaY < 0 && deltaX < 0 ) {
      this.dragbox.style.transform = `rotateX(180deg) rotateY(180deg) translateY(${Math.abs(deltaY)}px) translateX(${Math.abs(deltaX)}px)`;
    } else if ( deltaX < 0 ) {
      this.dragbox.style.transform = `rotateX(180deg) translateX(${deltaX}px)`;
    } else if ( deltaY < 0 ){
      this.dragbox.style.transform = `rotateY(180deg) translateY(${deltaY}px)`;
    }

    this.dragbox.style.width = `${Math.abs(deltaX)}px`;
    this.dragbox.style.height = `${Math.abs(deltaY)}px`;
    this.checkForOverlap();
  }
  startDragFileWindow(event) {
    this.desktop.addEventListener('mousemove', this.dragFileWindow);
    this.clickedLocationX = event.target.clientWidth - event.offsetX;
    this.clickedLocationY = event.target.clientHeight - event.offsetY;
    this.setState({draggingFileWindow: true, itemDragged: event.target.dataset.index });
  }
  dragFileWindow(event) {
    const { itemDragged, headerHeight } = this.state;
    this.props.dragFileWindow(itemDragged, event.clientX - this.clickedLocationX, event.clientY - headerHeight - this.clickedLocationY);
  }
  stopDragFileWindow() {
    this.desktop.removeEventListener('mousemove', this.dragFileWindow);
    this.setState({draggingFileWindow: false});
  }
  render() {
    const { desktopItems, contextMenuX, contextMenuY, contextMenuActive, selectedDesktopIcons, createFolder, openFile,
    openedFiles, entities } = this.props;
    const { desktopWidth, desktopHeight } = this.state;
    let unselectedIcons = desktopItems;
    if (this.icons.length > 0 && selectedDesktopIcons.length > 0) {
      unselectedIcons = this.diffNodeLists(this.icons, selectedDesktopIcons);
    }
    return (
      <div id="desktop"
           data-clickClass={windowsClickables.desktop}
           className={styles.root}
           onContextMenu={this.desktopContextMenu}
      >
        {
          desktopItems.map((desktopitem, index) => {
            return <DesktopItem key={index} desktopWidth={desktopWidth} desktopHeight={desktopHeight} index={index} openFile={openFile} item={desktopitem} />;
          })
        }
        {
          openedFiles.map((openedFile, index) => {
            return React.createElement(windowsFileRegistry[entities[openedFile.entityId].registryKey], { key: index, openedFile,
              filename: entities[openedFile.entityId].name,
              index, ...this.props});
          })
        }
        {
          contextMenuActive ? <ContextMenu createFolder={createFolder} contextMenuY={contextMenuY} contextMenuX={contextMenuX}/> : null
        }
      </div>
    );
  }
}

export default withStyles(styles)(Desktop);
