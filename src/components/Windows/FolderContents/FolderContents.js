import React, { PropTypes, Component } from 'react';
import { DropTarget as dropTarget } from 'react-dnd';
import styles from './FolderContents.css'; //eslint-disable-line
import withStyles from 'isomorphic-style-loader/lib/withStyles';

class FolderContents extends Component {
  static propTypes = {
    folderContents: PropTypes.array,
    connectDropTarget: PropTypes.func
  };
  render() {
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
