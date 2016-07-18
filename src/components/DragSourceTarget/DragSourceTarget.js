import React, { Component, PropTypes } from 'react';
import { DragSource as dragSource, DropTarget as dropTarget } from 'react-dnd';
import flow from 'lodash.flow';
// import withStyles from 'isomorphic-style-loader/lib/withStyles';
// import styles from './DragSourceTarget.css'; //eslint-disable-line

const widgetSource = {
  beginDrag(props) {
    console.log(props);
    const { id, order, index } = props;
    return { id, order, index };
  },
  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    if (item !== dropResult) {
      console.log(props);
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
  drop(props) {
    console.log(props);
    const { id, order, index } = props;
    return { id, order, index };
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
        console.log(this.props);
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
