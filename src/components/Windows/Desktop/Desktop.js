import React, { PropTypes, Component } from 'react';
import { DropTarget as dropTarget, DragDropContext as dragDropContext, DragSource as dragSource  } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Desktop.css'; //eslint-disable-line

import { evap_config } from '../../../config';
import windowsFileRegistry from '../windowsFileRegistry';
import { windowsClickables } from '../../../constants/windows';
import DesktopItem from '../FileIcon';
import ContextMenu from '../ContextMenu';
import ErrorWindow from '../ErrorWindow';
import Evaporate from 'evaporate';
import Uploader from '../Uploader';


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
    this.dragbox = null;
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
  componentDidMount() {
    this.icons = document.getElementsByClassName('desktopIcon');
    this.desktop = document.getElementById('desktop');
    this.header = document.getElementById('primaryHeader');


    // START dropzone stuff. todo: abstract this crap away to a HOC
    // todo : dropzone script is in index.jade. Should be packed with webpack
    this.dropzone = new Dropzone('div#desktop', {url: '/upload', autoProcessQueue:false, clickable: false, createImageThumbnails: false,
      previewsContainer: null,
    addedfile: file => {
      const { name, size, type } = file;
      Evaporate.create(evap_config)
        .then(
          evaporate => {
            evaporate.add({
              name: 'test.png',
              file,
              xAmzHeadersAtInitiate : {
                'x-amz-acl': 'public-read'
              },
              // progress: progressVal => {console.log('progress!!', progressVal)},
              info: info => {console.log('info!!', info)},
              error: error => {console.log('error!!', error)},
              warn: warn => {console.log('warn!!', warn)},
            })
              .then(
                awsKey => { },
                reason => { }
              ).catch(error=>{console.log(error);})
          },
          reason => {});
    }
    });


    // EMD DROPZONE STUFF
    this.desktop.onmousedown = this.desktopMouseDown;
    this.desktop.onmouseup = this.desktopMouseUp;
    // this.desktop.ondrop = this.desktopDropHandler;
    // this.desktop.ondragover = this.desktopDragoverHandler;
    // this.desktop.ondragend = this.desktopDragendHandler

    // todo rmw: desktopWidth and Height is both in the redux store and in component State. Should have it it only 1.
    this.props.initializeDesktopDimensions(this.desktop.offsetWidth, this.desktop.offsetHeight);
    window.addEventListener('resize', this.desktopResize.bind(this));
    // if (window) {
    //   try {
    //     this.dropzone = new Dropzone('div#desktop');
    //   } catch (e) {
    //     console.log(e);
    //   }
    // }

    this.setState({desktopWidth: this.desktop.offsetWidth, // todo have a workaround for this
      desktopHeight: this.desktop.offsetHeight,
      headerHeight: this.header.offsetHeight});
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (this.state.selectedIcons !== nextState.selectedIcons) ||
      (this.props.desktopWidth !== nextProps.desktopWidth) ||
      (this.props.desktopHeight !== nextProps.desktopHeight) ||
      (this.props.selectedDesktopIcons !== nextProps.selectedDesktopIcons) ||
      (this.props.contextMenuActive !== nextProps.contextMenuActive) ||
      (this.props.contextMenuX !== nextProps.contextMenuX)||
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
    const { clickclass } = event.target.dataset;
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
    const windowBeingResized = this.props.openedFiles[parseInt(event.target.dataset.index, 10)];
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
    this.props.resizeFileWindow(itemResized, resizeSideClicked, deltaX, deltaY, resizeStartWidth, resizeStartHeight,
      resizeStartLeft, resizeStartTop);
  }
  stopResizeFileWindow() {
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
    this.setState({draggingWindow: true, itemDragged: event.target.dataset.index });
  }
  dragWindow(event) {
    const { itemDragged, headerHeight } = this.state;
    this.props.dragWindow(itemDragged, this.desktop.dragType, event.clientX - this.clickedLocationX, event.clientY - headerHeight - this.clickedLocationY);
  }
  stopDragWindow() {
    this.desktop.removeEventListener('mousemove', this.dragWindow);
    this.setState({draggingWindow: false});
  }
  render() {
    const { desktopItems, contextMenuX, contextMenuY, contextMenuActive, contextMenuClickClass, contextMenuIndexClicked,
      errorWindows, closeErrorWindow, connectDropTarget, moveFile, moveFiles, desktopNodeIndex,
      selectedDesktopIcons, createFolder, openErrorWindow, openFile, openedFiles, fileSystem, desktopWidth, desktopHeight } = this.props;
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
                                key={desktopitem.index} desktopWidth={desktopWidth} desktopHeight={desktopHeight}
                                index={desktopitem.index} moveFiles={moveFiles} parentIndex={desktopNodeIndex}
                                moveFile={moveFile}  openFile={openFile} item={desktopitem} />
          })
        }
        {
          openedFiles.map((openedFile, index) => {
            const openedFileNode = fileSystem[openedFile.nodeIndex];
            const fileType = openedFileNode.hasOwnProperty('children') ? 'Folder' : openedFileNode.extension;
            return React.createElement(windowsFileRegistry[fileType], { key: index, openedFile,
              filename: fileSystem[openedFile.nodeIndex].name, desktopWidth, desktopHeight,
              index, ...this.props});
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

