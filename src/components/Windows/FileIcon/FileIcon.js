import React, { PropTypes } from 'react';
import { DragSource as dragSource, DropTarget as dropTarget } from 'react-dnd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './FileIcon.css'; //eslint-disable-line
import cx from 'classnames';
import { windowsClickables } from '../../../constants/windows';
import flow from 'lodash.flow';

function FileIcon({ item, openFile, connectDragSource, connectDropTarget, className, uploads }) {
  const style = {background: `url(${item.metadata.icon})`};
  const loadingBorder = (<svg className={styles.iconSVG} width="100%" height="100%">]
    <rect width="100%" height="100%" fill="transparent"
          stroke="#BBB"/>
    <path style={{strokeDashoffset: 400 * (1 - 0.5) }} d="M0 0 H 100 V 100 H 100 0 V 100 0" stroke="red" stroke-width="3" fill="transparent" />
  </svg>);
  console.log(uploads);
  if (item.metadata.sprite) {
    style.backgroundSize = '425px';
    style.backgroundPosition = item.metadata.backgroundPosition;
  }
  if (item.metadata.iconOpacity) {
    style.opacity = item.metadata.iconOpacity;
  }
  return connectDragSource(connectDropTarget(
    <div data-clickClass={windowsClickables.desktopItem} data-topClickable data-index={item.index} onDoubleClick={() => { openFile(item.index); }}
         className={cx(className, styles.root)}>
      { item.metadata.isLoading ? loadingBorder : null}
      <div style={style} data-clickClass={windowsClickables.desktopItemIcon} data-index={item.index} className={cx(styles.icon)}></div>

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
    Dropzone.instances[0].disable();
    return {index: props.item.index, selected: props.selected, parentIndex: props.parentIndex};
  },
  endDrag(props, monitor, component) {
    Dropzone.instances[0].enable();
    if (!monitor.didDrop()) {
      return;
    }

    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    if (item !== dropResult && (dropResult.canDrop)) {
      if(item.selected) {
        props.moveFiles(item.parentIndex, dropResult.index);
      } else{
        props.moveFile(item.index, dropResult.index);
      }
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

