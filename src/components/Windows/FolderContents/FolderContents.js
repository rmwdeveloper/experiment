import React, { PropTypes } from 'react';
import { DropTarget as dropTarget } from 'react-dnd';
import styles from './FolderContents.css'; //eslint-disable-line
import withStyles from 'isomorphic-style-loader/lib/withStyles';


function FolderContents({ folderContents, connectDropTarget }) {
  return connectDropTarget(
    <div className={styles.root}>
      {folderContents}
    </div>
  );
}

FolderContents.propTypes = {
  folderContents: PropTypes.array
};

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
