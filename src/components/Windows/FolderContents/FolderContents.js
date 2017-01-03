import React, { PropTypes, Component } from 'react';
import { DropTarget as dropTarget } from 'react-dnd';
import styles from './FolderContents.css'; //eslint-disable-line
import withStyles from 'isomorphic-style-loader/lib/withStyles';

class FolderContents extends Component {
  static propTypes = {
    folderContents: PropTypes.array,
    connectDropTarget: PropTypes.func
  };
  constructor() {
    super();
    this.startDragSelect = this.startDragSelect.bind(this); // todo: dragSelect. refactor this with the method found in desktop.
    this.dragSelecting = this.dragSelecting.bind(this);
    this.stopDragSelect = this.stopDragSelect.bind(this);
    this.checkForOverlap = this.checkForOverlap.bind(this);
    this.folderContentsMouseUp = this.folderContentsMouseUp.bind(this);
    this.folderContentsMouseDown = this.folderContentsMouseDown.bind(this);
    this.dragbox = null;
    this.icons = [];
    this.selectedIcons = [];
    this.state = {
      dragSelecting: false,
      dragStartX: null,
      dragStartY: null,
      fileWindowDragStartX: null,
      fileWindowDragStartY: null,
      headerHeight: null
    };
  }
  componentDidMount() {
    this.icons = document.getElementsByClassName('folderIcon');
    this.header = document.getElementById('primaryHeader');
    this.setState({desktopWidth: this.desktop.offsetWidth, // todo have a workaround for this
      headerHeight: this.header.offsetHeight});
  }
  startDragSelect(event) {
    const { headerHeight } = this.state;
    this.props.clearActives();
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
  folderContentsMouseUp(event) {
    const { dragSelecting} = this.state;
    if (dragSelecting) {
      this.stopDragSelect(event);
    }
  }
  folderContentsMouseDown(event) {
    this.startDragSelect(event);
  }
  render(){
    const { folderContents, connectDropTarget } = this.props;
    return connectDropTarget(
      <div className={styles.root}>
        {folderContents}
      </div>
    );
  }
}

const folderTarget = {
  drop(props, monitor) {
    if (monitor.didDrop()) {
      return;
    }
    return { index: props.index, canDrop: true };
  }
};

function collectTarget(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

export default withStyles(styles)(dropTarget(['fileIcon', 'desktopItemGroup'], folderTarget, collectTarget)(FolderContents));
