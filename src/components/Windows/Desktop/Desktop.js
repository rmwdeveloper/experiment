import React, { PropTypes, Component } from 'react';
import { DropTarget as dropTarget, DragDropContext as dragDropContext, DragSource as dragSource  } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Desktop.css'; //eslint-disable-line
import uuidV4 from 'uuid/v4';

import { evap_config } from '../../../config';
import windowsFileRegistry from '../windowsFileRegistry';
import { windowsClickables } from '../../../constants/windows';
import DesktopItem from '../FileIcon';
import ContextMenu from '../ContextMenu';
import ErrorWindow from '../ErrorWindow';
import SpaceAvailabilityIndicator from '../SpaceAvailabilityIndicator';
import Evaporate from 'evaporate';
import { resizeWindow } from '../../../core/layout'

// todo: desktopwidth / desktopheight still neceessary?
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
    this.getUploadId = this.getUploadId.bind(this);
    this.uploadComplete = this.uploadComplete.bind(this);
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
  getUploadId() {
    const { user, isAnonymousUser } = this.props;
    return isAnonymousUser ? 0 : user.id;
  }
  uploadComplete(awsKey, temporaryUploadId) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const { fileSystem, uploads, uploadComplete, desktopNodeIndex } = this.props;
    const newNode = fileSystem[uploads[temporaryUploadId]];
    delete newNode.metadata.temporaryUploadId; //todo: refactor.
    delete newNode.metadata.loading;
    delete newNode.metadata.iconOpacity;
    delete newNode.metadata.progress;

    fetch('/upload_complete', {method: 'post', headers,
      body: JSON.stringify({newNode, awsKey, parentIndex: desktopNodeIndex }),
      credentials: 'include'})
      .then(response => {
        return response.json().then(responseObject => {
          uploadComplete(temporaryUploadId);
          // todo: persist in uploads and filesystem.

        });
      }).catch(err => {
      return err;
    })
  }
  componentDidMount() {
    const { diskSpace } = this.props;
    this.icons = document.getElementsByClassName('desktopIcon');
    this.desktop = document.getElementById('desktop');
    this.header = document.getElementById('primaryHeader');
    const { checkAvailableSpace, uploadComplete, uploadStart, uploadProgress, uploadError, fileSystem, uploads } = this.props;
    // START dropzone stuff. todo: abstract this crap away to a HOC
    // todo : dropzone script is in index.jade. Should be packed with webpack
    // todo: convert fetch to isomorphic fetch ?

    this.dropzone = new Dropzone('div#desktop', {url: '/upload', autoProcessQueue:false, clickable: false, createImageThumbnails: false,
      previewsContainer: null,
    addedfile: file => {

      const { name, size, type } = file;
      const [fileName, extension] = name.split('.');
      const fileSizeMb = (size / 1000 / 1000).toFixed(2);
      const userId = this.getUploadId(); // todo : chagne this to getUserId
      const temporaryUploadId = uuidV4();

      checkAvailableSpace(fileName, extension, temporaryUploadId);

      fetch('/upload_start', {method: 'get', credentials: 'include'})
        .then(response => {
          response.json().then( responseObject => { // size in bytes
            const { usedSpace, date: { year, month, day, hours, minutes, seconds, milliseconds } } = responseObject;
            const mbUsed = (usedSpace / 1000 / 1000).toFixed(2); // usedSpace from server, not state.

            if ( diskSpace - mbUsed - fileSizeMb < 0) {
              uploadError();
              return null;
            }
            //todo: upload start action
            //todo: Some sort of auth here, prevent unauth uploads. Dont trust client.
            uploadStart(parseFloat(fileSizeMb, 10) + parseFloat(mbUsed, 10), temporaryUploadId);

            Evaporate.create(evap_config)
              .then(
                evaporate => {
                  evaporate.add({
                    name: `${userId}/${year}/${month}/${day}/${hours}${minutes}${seconds}${milliseconds}/${name}`,
                    file,
                    xAmzHeadersAtInitiate : {
                      'x-amz-acl': 'public-read'
                    },
                    progress: progressVal => {
                      uploadProgress(progressVal, temporaryUploadId);
                    },
                    info: info => {},
                    error: error => {},
                    warn: warn => {},
                    complete: (xhr, awsObjectKey, stats) => {
                      this.uploadComplete(awsObjectKey, temporaryUploadId);
                    }
                  })
                    .then(
                      awsKey => { },
                      reason => { }
                    ).catch(error=>{console.log(error);})
                },
                reason => {});
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
    });


    // END DROPZONE STUFF
    this.desktop.onmousedown = this.desktopMouseDown;
    this.desktop.onmouseup = this.desktopMouseUp;


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
      (this.props.showSpaceIndicator !== nextProps.showSpaceIndicator) ||
      (this.props.usedSpace !== nextProps.usedSpace) ||
      (this.props.uploads !== nextProps.uploads) ||
      (this.props.selectedDesktopIcons !== nextProps.selectedDesktopIcons) ||
      (this.props.contextMenuActive !== nextProps.contextMenuActive) ||
      (this.props.contextMenuX !== nextProps.contextMenuX) ||
      (this.props.openedFiles !== nextProps.openedFiles) ||
      (this.props.fileSystem !== nextProps.fileSystem) ||
      (this.props.errorWindows !== nextProps.errorWindows) ||
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
    const { openedFiles, openedFileDimensions } = this.props;
    const windowBeingResized = openedFileDimensions[openedFiles[parseInt(event.target.dataset.index, 10)]];
    this.resizedItem = event.target.parentNode; // todo: Change how parent node is retrieved.

    this.setState({ resizingFileWindowInProgress: true, resizeStartX: event.clientX, resizeStartY: event.clientY,
    itemResized: event.target.dataset.index, resizeStartHeight: event.target.parentNode.clientHeight,
      resizeSideClicked: event.target.dataset.side, resizeStartLeft: windowBeingResized.xPosition,
      resizeStartTop: windowBeingResized.yPosition, resizeStartWidth: event.target.parentNode.clientWidth });
    this.desktop.addEventListener('mousemove', this.fileWindowResizing);
  }
  fileWindowResizing(event) {
    const { itemResized, resizeStartHeight, resizeStartWidth, resizeSideClicked, resizeStartLeft, resizeStartTop } = this.state;
    const deltaX = event.clientX - this.state.resizeStartX;
    const deltaY = event.clientY - this.state.resizeStartY;
    this.resizeDeltaX = event.clientX - this.state.resizeStartX;
    this.resizeDeltaY = event.clientY - this.state.resizeStartY;

    resizeWindow(this.resizedItem, resizeSideClicked, deltaX, deltaY, resizeStartWidth, resizeStartHeight,
     resizeStartLeft, resizeStartTop);
  }
  stopResizeFileWindow(event) {
    const { itemResized, resizeStartHeight, resizeStartWidth, resizeSideClicked, resizeStartLeft, resizeStartTop } = this.state;
    this.props.resizeFileWindow(itemResized, resizeSideClicked, this.resizeDeltaX, this.resizeDeltaY, resizeStartWidth, resizeStartHeight,
      resizeStartLeft, resizeStartTop);
    this.desktop.removeEventListener('mousemove', this.fileWindowResizing);
    this.setState({ resizingFileWindowInProgress: false, resizeStartX: null, resizeStartY: null, itemResized: null,
    resizeStartHeight: null, resizeStartWidth: null, resizeSideClicked: null, resizeStartTop: null, resizeStartLeft: null});
  }
  startDragSelect(event) {
    const { headerHeight } = this.state;
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
  startDragWindow(event, type) {
    this.desktop.dragType = type;
    this.desktop.addEventListener('mousemove', this.dragWindow);
    this.clickedLocationX = event.offsetX;
    this.clickedLocationY = event.offsetY;
    this.draggedItem = event.target.parentNode;
    this.setState({draggingWindow: true, itemDragged: event.target.dataset.index });
  }
  dragWindow(event) {
    const { itemDragged, headerHeight } = this.state;
    this.draggedItem.style.left = `${event.clientX - this.clickedLocationX}px`;
    this.draggedItem.style.top = `${event.clientY - this.clickedLocationY - headerHeight}px`;
  }
  stopDragWindow() {
    const { itemDragged, headerHeight } = this.state;
    this.desktop.removeEventListener('mousemove', this.dragWindow);
    this.props.dragWindow(itemDragged, this.desktop.dragType, event.clientX - this.clickedLocationX, event.clientY - headerHeight - this.clickedLocationY);
    this.setState({draggingWindow: false});
  }
  render() {
    const { desktopItems, contextMenuX, contextMenuY, contextMenuActive, contextMenuClickClass, contextMenuIndexClicked,
      errorWindows, closeErrorWindow, connectDropTarget, moveFile, moveFiles, desktopNodeIndex, usedSpace, diskSpace,
      showSpaceIndicator, uploads,
      selectedDesktopIcons, createFolder, openErrorWindow, openFile, openedFiles, fileSystem } = this.props;
    const selectedIds = selectedDesktopIcons.map(id => {return parseInt(id, 10)});
    return (connectDropTarget(
      <div id="desktop"
           data-clickClass={windowsClickables.desktop}
           data-topClickable
           className={styles.root}
           onContextMenu={this.desktopContextMenu}
      >
        {/*<Dropzone className={styles.dropzone} disableClick onDrop={()=>{console.log('dropzone onDrop method');}} ref="dropzone" accept="*" /> */}
        {
          desktopItems.map((desktopitem) => {
            return <DesktopItem selected={selectedIds.includes(desktopitem.index)} className='desktopIcon'
                                key={desktopitem.index} uploads={uploads}
                                index={desktopitem.index} moveFiles={moveFiles} parentIndex={desktopNodeIndex}
                                moveFile={moveFile}  openFile={openFile} item={desktopitem} />
          })
        }
        {
          openedFiles.map((openedFile) => {
            const openedFileNode = fileSystem[openedFile.nodeIndex];
            const fileType = openedFileNode.hasOwnProperty('children') ? 'Folder' : openedFileNode.extension;
            return React.createElement(windowsFileRegistry(fileType, openedFileNode), { key: openedFile.uniqueId, openedFile,
              filename: openedFileNode.name, ...this.props});
          })
        }
        {
          errorWindows.map((errorObject, index) => {
            return <ErrorWindow errorObject={errorObject} index={index} closeErrorWindow={closeErrorWindow} key={index} />;
          })
        }
        {
          contextMenuActive ? <ContextMenu
                openErrorWindow={openErrorWindow}
                contextMenuClickClass={contextMenuClickClass}
                contextMenuIndexClicked={contextMenuIndexClicked}
                createFolder={createFolder}
                contextMenuY={contextMenuY}
                contextMenuX={contextMenuX}/> : null
        }
        {
            showSpaceIndicator ?  <SpaceAvailabilityIndicator className={styles.showIndicator} usedSpace={usedSpace} diskSpace={diskSpace} /> : null
        }
      </div>
    ));
  }
}


const desktopTarget = {
  drop(props, monitor) {
    if (monitor.didDrop()) {
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

export default withStyles(styles)(dragDropContext(HTML5Backend)(dropTarget(['fileIcon', 'fileIconGroup'], desktopTarget, collectTarget)(Desktop)));

