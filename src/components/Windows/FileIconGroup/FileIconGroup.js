import React, { PropTypes } from 'react';
import { DragSource as dragSource } from 'react-dnd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './FileIconGroup.css'; //eslint-disable-line
import cx from 'classnames';
import { windowsClickables } from '../../../constants/windows';

function FileIconGroup({ selectedFileIndices, connectDragSource, fileSystem, className }) {
  const desktopItems = selectedFileIndices.map(index => {
    const item = fileSystem[index];
    const style = {backgroundColor: 'rgba(66,85,101,0.25)', outline: '2px solid rgb(115, 128, 140)'};
    return (
      <div data-clickClass={windowsClickables.desktopItem} data-topClickable data-index={item.index} style={style} key={item.index} className={cx(className, styles.desktopItem)}>
        <img data-index={item.index} className={styles.icon} src={item.metadata.icon} alt={`${item.name} icon`} />
        <span className={styles.directoryName}> {item.name}</span>
      </div>
    )
  });
  return ( connectDragSource(
    <div className={styles.root}>
      {desktopItems}
    </div>
  ));
}

FileIconGroup.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number
};

const desktopItemsGroupSource = {
  beginDrag(props) {
    return {indices: props.selectedFileIndices, parentIndex: props.parentIndex };
  },
  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    if (item !== dropResult) {
      props.moveFiles(item.indices, item.parentIndex, dropResult.index);
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

export default withStyles(styles)(dragSource('fileIconGroup', desktopItemsGroupSource, collectSource)(FileIconGroup));
