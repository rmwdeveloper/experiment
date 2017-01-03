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
