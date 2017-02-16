import React, { PropTypes, Component } from 'react';
import interact from 'interactjs';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Desktop.css'; //eslint-disable-line
import windowsFileRegistry from '../windowsFileRegistry';
import { windowsClickables } from '../../../constants/windows';
import DropzoneAWSEvaporate from '../DropzoneAWSEvaporate';
import DesktopItem from '../FileIcon';
import ContextMenu from '../ContextMenu';

import SpaceAvailabilityIndicator from '../SpaceAvailabilityIndicator';

import { resizeWindow } from '../../../core/layout';

//todo: Abstract away mobile / desktop event differences ( client / offset x y values )

// todo: desktopwidth / desktopheight still neceessary?
class Desktop extends Component {
  static propTypes = {
    contextMenuActive: PropTypes.bool,
    contextMenuX: PropTypes.number,
    contextMenuY: PropTypes.number,
    openContextMenu: PropTypes.func,
    openedFiles: PropTypes.object,
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
    this.startDragSelect = this.startDragSelect.bind(this); // todo: dragSelect. refactor this with the method found in FolderContents.
    this.stopDragSelect = this.stopDragSelect.bind(this);
    this.startDragWindow = this.startDragWindow.bind(this);
    this.dragWindow = this.dragWindow.bind(this);
    this.stopDragWindow = this.stopDragWindow.bind(this);
    this.dragSelecting = this.dragSelecting.bind(this);
    this.checkForOverlap = this.checkForOverlap.bind(this);
    this.desktopContextMenu = this.desktopContextMenu.bind(this);
    this.desktopMouseUp = this.desktopMouseUp.bind(this);
    this.desktopMouseDown = this.desktopMouseDown.bind(this);
    this.startResizeFileWindow = this.startResizeFileWindow.bind(this);
    this.stopResizeFileWindow = this.stopResizeFileWindow.bind(this);
    this.fileWindowResizing = this.fileWindowResizing.bind(this);
    this.findAncestorWithClickClass = this.findAncestorWithClickClass.bind(this);
    this.onDrop = this.onDrop.bind(this);

    this.dragbox = null;
    this.draggedItem = null;
    this.resizedItem = null;
    this.icons = [];
    this.selectedIcons = [];
    this.diffNodeLists = this.diffNodeLists.bind(this);
    this.state = {
      dragSelecting: false,
      draggingWindow: false,
      resizingFileWindowInProgress: false,
      resizeStartX: null,
      resizeStartY: null,
      resizeStartHeight: null,
      resizeStartWidth: null,
      resizeStartTop: null,
      resizeStartLeft: null,
      resizeSideClicked: null,
      dragStartX: null,
      dragStartY: null,
      fileWindowDragStartX: null,
      fileWindowDragStartY: null,
      itemDragged: null,
      itemResized: null,
      headerHeight: null
    };
  }

  onDrop(event){
    console.log('dropped on desktop');
    const {moveFiles, moveFile, desktopNodeIndex} = this.props;
    const index = event.relatedTarget.getAttribute('data-index');
    const selected = event.relatedTarget.getAttribute('data-selected');
    const parentIndex = event.relatedTarget.getAttribute('data-parentIndex');

    if(event.relatedTarget.classList.contains('selected')) { //set attribute true sets it to 'true'...
      moveFiles(event.relatedTarget.getAttribute('data-index'), desktopNodeIndex);
    } else{
      moveFile(event.relatedTarget.getAttribute('data-index'), desktopNodeIndex);
    }

  }
  componentDidMount() {
    this.icons = document.getElementsByClassName('desktopIcon');
    this.desktop = document.getElementById('desktop');
    this.header = document.getElementById('primaryHeader');
    
    this.desktop.onmousedown = this.desktopMouseDown;
    this.desktop.addEventListener('touchstart', this.desktopMouseDown);

    this.desktop.onmouseup = this.desktopMouseUp;
    this.desktop.addEventListener('touchend', this.desktopMouseUp);

    interact('#desktop').dropzone({
      accept: '.fileIcon',
      overlap: 0.75,
      ondrop: this.onDrop
    });

    // todo rmw: desktopWidth and Height is both in the redux store and in component State. Should have it it only 1.
    this.props.initializeDesktopDimensions(this.desktop.offsetWidth, this.desktop.offsetHeight);
    window.addEventListener('resize', this.desktopResize.bind(this));

    this.setState({desktopWidth: this.desktop.offsetWidth, // todo have a workaround for this
      desktopHeight: this.desktop.offsetHeight,
      headerHeight: this.header.offsetHeight});
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (this.state.selectedIcons !== nextState.selectedIcons) ||
      (this.props.registering !== nextProps.registering) ||
      (this.props.desktopHeight !== nextProps.desktopHeight) ||
      (this.props.showSpaceIndicator !== nextProps.showSpaceIndicator) ||
      (this.props.usedSpace !== nextProps.usedSpace) ||
      (this.props.uploads !== nextProps.uploads) ||
      (this.props.selectedDesktopIcons !== nextProps.selectedDesktopIcons) ||
      (this.props.contextMenuActive !== nextProps.contextMenuActive) ||
      (this.props.contextMenuX !== nextProps.contextMenuX) ||
      (this.props.openedFiles !== nextProps.openedFiles) ||
      (this.props.openedFileDimensions !== nextProps.openedFileDimensions) ||
      (this.props.fileSystem !== nextProps.fileSystem) ||
      (this.props.errorMessages !== nextProps.errorMessages) ||
      (this.props.contextMenuY !== nextProps.contextMenuY);
  }
  diffNodeLists(firstNodeList, secondNodeList) {
    const iconsArray = [].slice.call(firstNodeList);
    const selectedArray = [].slice.call(secondNodeList);
    return iconsArray.filter(icon => {
      return selectedArray.indexOf(icon) < 0;
    });
  }
  findAncestorWithClickClass(node) {
    if(node.dataset.hasOwnProperty('topclickable')) {
      return node;
    }
    while ((node = node.parentElement)) {
      if(node.dataset.hasOwnProperty('topclickable')) {
        return node;
      }
    };
    return node;
  }
  desktopMouseDown(event) {
    const {clickclass} = event.target.dataset;
    if (event.button === 2) { // Right mouse button clicked
      return null;
    }
    switch (clickclass) {
      case windowsClickables.fileResizeHandle:
        this.startResizeFileWindow(event);
        break;
      case windowsClickables.desktop:
        this.startDragSelect(event);
        break;
      case windowsClickables.fileTaskbarFilename:
      case windowsClickables.fileTaskbar:
        this.startDragWindow(event, 'file');
        break;
      case windowsClickables.errorTaskbar:
        this.startDragWindow(event, 'error');
        break;
      case windowsClickables.desktopItem:
        break;
      case windowsClickables.desktopItemIcon:
        break;

      default:
        return null;
    }
  }
  desktopMouseUp(event) {
    const { clickclass } = event.target.dataset;
    const { dragSelecting, draggingWindow, resizingFileWindowInProgress} = this.state;
    if (dragSelecting) {
      this.stopDragSelect(event);
    } else if (draggingWindow) {
     this.stopDragWindow(event);
    } else if (resizingFileWindowInProgress) {
      this.stopResizeFileWindow(event);
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
  startResizeFileWindow(event) {
    event.preventDefault();
    const clientX = event.type === 'touchstart' ? event.touches[0].clientX : event.clientX;
    const clientY = event.type === 'touchstart' ? event.touches[0].clientY : event.clientY;

    const { openedFileDimensions } = this.props;
    const windowBeingResized = openedFileDimensions[event.target.dataset.uniqueid];
    this.resizedItem = event.target.parentNode; // todo: Change how parent node is retrieved.

    this.setState({ resizingFileWindowInProgress: true, resizeStartX: clientX, resizeStartY: clientY,
    itemResized: event.target.dataset.uniqueid, resizeStartHeight: event.target.parentNode.clientHeight,
      resizeSideClicked: event.target.dataset.side, resizeStartLeft: windowBeingResized.xPosition,
      resizeStartTop: windowBeingResized.yPosition, resizeStartWidth: event.target.parentNode.clientWidth });
    this.desktop.addEventListener('mousemove', this.fileWindowResizing);
    this.desktop.addEventListener('touchmove', this.fileWindowResizing);
  }
  fileWindowResizing(event) {
    event.preventDefault();
    const { resizeStartHeight, resizeStartWidth, resizeSideClicked, resizeStartLeft, resizeStartTop } = this.state;
    const clientX = event.type === 'touchmove' ? event.touches[0].clientX : event.clientX;
    const clientY = event.type === 'touchmove' ? event.touches[0].clientY : event.clientY;

    this.resizeDeltaX = clientX - this.state.resizeStartX;
    this.resizeDeltaY = clientY - this.state.resizeStartY;

    resizeWindow(this.resizedItem, resizeSideClicked, this.resizeDeltaX, this.resizeDeltaY, resizeStartWidth, resizeStartHeight,
     resizeStartLeft, resizeStartTop);
  }
  stopResizeFileWindow(event) {
    event.preventDefault();
    const { itemResized, resizeStartHeight, resizeStartWidth, resizeSideClicked, resizeStartLeft, resizeStartTop } = this.state;
    this.props.resizeFileWindow(itemResized, resizeSideClicked, this.resizeDeltaX, this.resizeDeltaY, resizeStartWidth, resizeStartHeight,
      resizeStartLeft, resizeStartTop);
    this.desktop.removeEventListener('mousemove', this.fileWindowResizing);
    this.desktop.removeEventListener('touchmove', this.fileWindowResizing);
    this.setState({ resizingFileWindowInProgress: false, resizeStartX: null, resizeStartY: null, itemResized: null,
    resizeStartHeight: null, resizeStartWidth: null, resizeSideClicked: null, resizeStartTop: null, resizeStartLeft: null});
  }
  startDragSelect(event) {
    event.preventDefault();
    const { headerHeight } = this.state;

    const clientX = event.type === 'touchstart' ?  event.touches[0].clientX : event.clientX;
    const clientY = event.type === 'touchstart' ?  event.touches[0].clientY : event.clientY;

    this.props.clearActives();
    this.props.closeStartMenu();
    this.dragbox = document.getElementById('dragbox');
    if (!this.dragbox) {
      this.dragbox = document.createElement('div');
      this.dragbox.setAttribute('id', 'dragbox');
      this.desktop.appendChild(this.dragbox);
      this.dragbox.style.position = 'absolute';
      this.dragbox.style.zIndex = 1;
      this.dragbox.style.backgroundColor = 'rgba(35, 90, 216, .25)';
    }


    this.dragbox.style.top = `${clientY - headerHeight}px`;
    this.dragbox.style.left = `${clientX}px`;
    this.dragbox.style.width = '10px';
    this.dragbox.style.height = '10px';
    this.desktop.addEventListener('mousemove', this.dragSelecting);
    this.desktop.addEventListener('touchmove', this.dragSelecting);

    this.setState({
      dragStartX: clientX,
      dragStartY: clientY,
      dragSelecting: true
    });
    this.checkForOverlap();
  }
  stopDragSelect(event) {
    event.preventDefault();
    const { selectIcons } = this.props;
    this.desktop.removeEventListener('mousemove', this.dragSelecting);
    this.desktop.removeEventListener('touchmove', this.dragSelecting);

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
        this.selectedIcons.push(this.icons[i].dataset['index']);
      }
    }
  }
  desktopContextMenu(event) {
    const node = this.findAncestorWithClickClass(event.target);
    const { clickclass, index } = node.dataset;
    const { headerHeight } = this.state;
    event.preventDefault();
    this.props.openContextMenu(event.clientX, event.clientY - headerHeight, clickclass, index);
  }
  desktopResize() {
    this.props.resizeBrowserWindow(window.innerWidth, window.innerHeight, this.desktop.offsetWidth, this.desktop.offsetHeight)
  }
  dragSelecting(event) {
    event.preventDefault();

    const clientX = event.type === 'touchmove' ? event.touches[0].clientX : event.clientX;
    const clientY = event.type === 'touchmove' ? event.touches[0].clientY : event.clientY;
    const deltaX = clientX - this.state.dragStartX;
    const deltaY = clientY - this.state.dragStartY;

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
  startDragWindow(event, type) {
    event.preventDefault();
    const rectDimensions = event.target.getBoundingClientRect();
    const offsetX = event.type === 'touchstart' ? event.touches[0].pageX - rectDimensions.left : event.offsetX;
    const offsetY = event.type === 'touchstart' ? event.touches[0].pageY - rectDimensions.top : event.offsetY;

    this.desktop.dragType = type;
    this.desktop.addEventListener('mousemove', this.dragWindow);
    this.desktop.addEventListener('touchmove', this.dragWindow);
    this.clickedLocationX = offsetX;
    this.clickedLocationY = offsetY;
    this.draggedItem = this.findAncestorWithClickClass(event.target).parentNode;

    this.setState({draggingWindow: true, itemDragged: event.target.dataset.index });
  }
  dragWindow(event) {
    event.preventDefault();
    const clientX = event.type === 'touchmove' ? event.touches[0].clientX : event.clientX;
    const clientY = event.type === 'touchmove' ? event.touches[0].clientY : event.clientY;
    const { headerHeight } = this.state;
    this.draggedItem.style.left = `${clientX - this.clickedLocationX}px`;
    this.draggedItem.style.top = `${clientY - this.clickedLocationY - headerHeight}px`;
  }
  stopDragWindow() {
    event.preventDefault();
    const clientX = event.type === 'touchend' ? event.changedTouches[0].clientX : event.clientX;
    const clientY = event.type === 'touchend' ? event.changedTouches[0].clientY : event.clientY;
    const { itemDragged, headerHeight } = this.state;
    this.desktop.removeEventListener('mousemove', this.dragWindow);
    this.desktop.removeEventListener('touchmove', this.dragWindow);
    this.props.dragWindow(itemDragged, this.desktop.dragType, clientX - this.clickedLocationX, clientY - headerHeight - this.clickedLocationY);
    this.setState({draggingWindow: false});
  }
  render() {
    const { desktopItems, contextMenuX, contextMenuY, contextMenuActive, contextMenuClickClass, contextMenuIndexClicked,
      connectDropTarget, moveFile, moveFiles, desktopNodeIndex, usedSpace, diskSpace, deleteFiles,
      showSpaceIndicator, uploads,
      selectedDesktopIcons, createFolder, openErrorWindow, openFile, openedFiles, fileSystem } = this.props;

    return (
      <div id="desktop"
           data-clickClass={windowsClickables.desktop}
           data-topClickable
           className={styles.root}
           onContextMenu={this.desktopContextMenu}
      >
        {
          desktopItems.map((desktopitem, index) => {
            return <DesktopItem selected={selectedDesktopIcons.includes(desktopitem.index)} className='desktopIcon'
                                key={desktopitem.index} uploads={uploads} clickClass='desktopItem'
                                index={desktopitem.index} moveFiles={moveFiles} parentIndex={desktopNodeIndex}
                                moveFile={moveFile}  openFile={openFile} item={desktopitem} {...this.props} />
          })
        }
        {
          Object.keys(openedFiles).map((uniqueId) => {
            const openedFileNode = fileSystem[openedFiles[uniqueId]];
            const fileType = openedFileNode.hasOwnProperty('children') ? 'Folder' : openedFileNode.extension;
            return React.createElement(windowsFileRegistry(fileType, openedFileNode), { key: uniqueId, openedFile: openedFileNode,
              uniqueId, filename: openedFileNode.name, ...this.props});
          })
        }
        {
          contextMenuActive ? <ContextMenu
                openErrorWindow={openErrorWindow}
                contextMenuClickClass={contextMenuClickClass}
                contextMenuIndexClicked={contextMenuIndexClicked}
                createFolder={createFolder}
                deleteFiles={deleteFiles}
                contextMenuY={contextMenuY}
                contextMenuX={contextMenuX}/> : null
        }
        {
            showSpaceIndicator ?  <SpaceAvailabilityIndicator className={styles.showIndicator} usedSpace={usedSpace} diskSpace={diskSpace} /> : null
        }
      </div>
    );
  }
}


const desktopTarget = {
  drop(props, monitor) {
    if (monitor.didDrop()) { // dropped on child. 
      return;
    }
    return { index: props.desktopNodeIndex, canDrop: true };

  }

};

function collectTarget(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

export default withStyles(styles)(DropzoneAWSEvaporate(Desktop, 'desktop'));
// export default withStyles(styles)(dragDropContext(HTML5Backend)(dropTarget(['fileIcon', 'fileIconGroup'], desktopTarget, collectTarget)(DropzoneAWSEvaporate(Desktop, 'desktop'))));

