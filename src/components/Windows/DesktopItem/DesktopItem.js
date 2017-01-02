import React, { PropTypes } from 'react';
import { DragSource as dragSource, DropTarget as dropTarget } from 'react-dnd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './DesktopItem.css'; //eslint-disable-line
import cx from 'classnames';
import { windowsClickables } from '../../../constants/windows';
import flow from 'lodash.flow';

function DesktopItem({ item, openFile, desktopWidth, desktopHeight, selected, connectDragSource, connectDropTarget }) {
  const style = selected ? {backgroundColor: 'rgba(66,85,101,0.25)', outline: '2px solid rgb(115, 128, 140)'} : {};
  return connectDragSource( connectDropTarget(
    <div style={style} data-clickClass={windowsClickables.desktopItem} data-topClickable data-index={item.index} onDoubleClick={() => { openFile(item.index, desktopWidth, desktopHeight); }} className={cx('desktopIcon', styles.root)}>
      <img data-index={item.index} className={styles.icon} src={item.metadata.icon} alt={`${item.name} icon`} />
      <span data-clickClass={windowsClickables.desktopItemName} data-index={item.index} className={styles.directoryName}> {item.name}</span>
    </div>
  ));
}

DesktopItem.propTypes = {
  item: PropTypes.object,
  openFile: PropTypes.func
};

const desktopItemSource = {
  beginDrag(props) {
    return {index: props.index};
  },
  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();

    if (item !== dropResult) {
      props.moveFile(item, dropResult);
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

const desktopItemTarget = {
  drop(props) {
    return { index: props.index };
  },
};

function collectTarget(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

export default withStyles(styles)(flow(dragSource('desktopItem', desktopItemSource, collectSource),
  dropTarget('desktopItem', desktopItemTarget, collectTarget))(DesktopItem));

