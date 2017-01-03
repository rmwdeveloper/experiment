import React, { PropTypes } from 'react';
import { DragSource as dragSource } from 'react-dnd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './DesktopItemsGroup.css'; //eslint-disable-line
import cx from 'classnames';

function DesktopItemGroup({ selectedFileIndices, connectDragSource, fileSystem }) {
  const desktopItems = selectedFileIndices.map(index => {
    const item = fileSystem[index];
    const style = {backgroundColor: 'rgba(66,85,101,0.25)', outline: '2px solid rgb(115, 128, 140)'};
    return (
      <div style={style} key={item.index} className={cx('desktopIcon', styles.desktopItem)}>
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

DesktopItemGroup.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number
};

const desktopItemsGroupSource = {
  beginDrag(props) {
    return {index: props.selectedFileIndices};
  },
  endDrag(props, monitor, component) {
    console.log(props, monitor, component);
    if (!monitor.didDrop()) {
      return;
    }
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    console.log('test');
    if (item !== dropResult) {
      // console.log('test');
      // props.moveFile(item, dropResult);
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

export default withStyles(styles)(dragSource('desktopItemGroup', desktopItemsGroupSource, collectSource)(DesktopItemGroup));
