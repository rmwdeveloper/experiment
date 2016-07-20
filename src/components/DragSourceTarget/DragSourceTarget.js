import React, { Component, PropTypes } from 'react';
import { DragSource as dragSource, DropTarget as dropTarget } from 'react-dnd';
import flow from 'lodash.flow';
// import withStyles from 'isomorphic-style-loader/lib/withStyles';
// import styles from './DragSourceTarget.css'; //eslint-disable-line

const widgetSource = {
  beginDrag({ cellIndex }) {
    return {cellIndex};
  },
  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    if (item !== dropResult) {
      props.swapWidgetPosition(item, dropResult);
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
const widgetTarget = {
  drop({ cell }) {
    return cell;
  }
};

function collectTarget(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

function dragSourceTarget(ComposedComponent, props) {
  return flow(
    dragSource('widget', widgetSource, collectSource),
    dropTarget('widget', widgetTarget, collectTarget)
  )(
    class DragSourceTarget extends Component {
      static propTypes = {
        connectDragSource: PropTypes.func.isRequired,
        connectDropTarget: PropTypes.func.isRequired
      };

      render() {
        const { connectDragSource, connectDropTarget } = this.props;
        return (
          connectDragSource(connectDropTarget(
            <div>
              <ComposedComponent {...this.props} />
            </div>
          ))
        );
      }
    });
}

export default dragSourceTarget;
