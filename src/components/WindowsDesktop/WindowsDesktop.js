import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './WindowsDesktop.css'; //eslint-disable-line

import WindowsDesktopItem from '../WindowsDesktopItem';
import WindowsContextMenu from '../WindowsContextMenu';
import WindowsFolder from '../WindowsFolder';

class WindowsDesktop extends Component {
  constructor() {
    super();
    this.startDragSelect = this.startDragSelect.bind(this);
    this.stopDragSelect = this.stopDragSelect.bind(this);
    this.dragSelecting = this.dragSelecting.bind(this);
    this.checkForOverlap = this.checkForOverlap.bind(this);
    this.desktopContextMenu = this.desktopContextMenu.bind(this);
    this.dragbox = null;
    this.icons = [];
    this.selectedIcons = [];
    this.diffNodeLists = this.diffNodeLists.bind(this);
    this.state = {
      dragSelecting: false,
      dragStartX: null,
      dragStartY: null,
    };
  }
  componentDidMount() {
    this.icons = document.getElementsByClassName('desktopIcon');
    window.oncontextmenu = this.desktopContextMenu;
  }
  componentWillUnmount() {

  }
  shouldComponentUpdate(nextProps, nextState) {
    return (this.state.selectedIcons !== nextState.selectedIcons) ||
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
  startDragSelect(event) {
    if (event.target !== event.currentTarget) {
      return;
    }
    this.props.clearActives();
    const desktop = document.getElementById('desktop');
    this.dragbox = document.getElementById('dragbox');
    if (!this.dragbox) {
      this.dragbox = document.createElement('div');
      this.dragbox.setAttribute('id', 'dragbox');
      desktop.appendChild(this.dragbox);
      this.dragbox.style.border = '1px dashed black';
      this.dragbox.style.position = 'absolute';
    }

    this.dragbox.style.top = `${event.clientY}px`;
    this.dragbox.style.left = `${event.clientX}px`;
    this.dragbox.style.width = '10px';
    this.dragbox.style.height = '10px';
    desktop.addEventListener('mousemove', this.dragSelecting);

    this.setState({
      dragStartX: event.clientX,
      dragStartY: event.clientY
    });
    this.checkForOverlap();
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
    event.preventDefault();
    this.props.openContextMenu(event.clientX, event.clientY);
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

  stopDragSelect() {
    const { selectIcons } = this.props;
    const desktop = document.getElementById('desktop');
    desktop.removeEventListener('mousemove', this.dragSelecting);

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

  render() {
    const { desktopItems, contextMenuX, contextMenuY, contextMenuActive, selectedDesktopIcons, createFolder, openFile,
    openedFiles } = this.props;
    let unselectedIcons = desktopItems;
    if (this.icons.length > 0 && selectedDesktopIcons.length > 0) {
      unselectedIcons = this.diffNodeLists(this.icons, selectedDesktopIcons);
    }
    return (
      <div id="desktop" className={styles.root} onMouseDown={this.startDragSelect} onMouseUp={this.stopDragSelect}>
        {
          desktopItems.map((desktopitem, index) => {
            return <WindowsDesktopItem key={index} index={index} openFile={openFile} item={desktopitem} />;
          })
        }
        {
          openedFiles.map((openedFiles) => {
            return <WindowsFolder />;
          })
        }
        {
          contextMenuActive ? <WindowsContextMenu createFolder={createFolder} contextMenuY={contextMenuY} contextMenuX={contextMenuX}/> : null
        }
      </div>
    );
  }
}

WindowsDesktop.propTypes = {};
export default withStyles(styles)(WindowsDesktop);
