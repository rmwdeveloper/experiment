import React, { PropTypes } from 'react';
import { DragSource as dragSource, DropTarget as dropTarget } from 'react-dnd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './FileIcon.css'; //eslint-disable-line
import cx from 'classnames';
import { windowsClickables } from '../../../constants/windows';
import flow from 'lodash.flow';

function FileIcon({ item, openFile, desktopWidth, desktopHeight, selected, connectDragSource, connectDropTarget, className }) {
  const style = selected ? {backgroundColor: 'rgba(66,85,101,0.25)', outline: '2px solid rgb(115, 128, 140)'} : {};
  console.log(item);
  return connectDragSource(connectDropTarget(
    <div style={style} data-clickClass={windowsClickables.desktopItem} data-topClickable data-index={item.index} onDoubleClick={() => { openFile(item.index, desktopWidth, desktopHeight); }}
         className={cx(className, styles.root)}>
      <img data-index={item.index} className={styles.icon} src={item.metadata.icon} alt={`${item.name} icon`} />
      <span data-clickClass={windowsClickables.desktopItemName} data-index={item.index} className={styles.directoryName}> {item.name}</span>
    </div>
  ));
}

FileIcon.propTypes = {
  item: PropTypes.object,
  openFile: PropTypes.func
};

const fileIconSource = {
  beginDrag(props) {
    return {index: props.item.index};
  },
  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }

    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    if (item !== dropResult && (dropResult.canDrop)) {
      props.moveFile(item.index, dropResult.index);
    }
    if (props === component) {
      return;
    }
  }
};
function collectSource(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

const fileIconTarget = {
  drop(props) {
    return { index: props.index, canDrop: props.item.hasOwnProperty('children') };
  }
};

function collectTarget(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

export default withStyles(styles)(flow(dragSource('fileIcon', fileIconSource, collectSource),
  dropTarget(['fileIcon', 'fileIconGroup'], fileIconTarget, collectTarget))(FileIcon));

