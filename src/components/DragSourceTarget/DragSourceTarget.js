// import React, { Component, PropTypes } from 'react';
// import { DragSource as dragSource, DropTarget as dropTarget } from 'react-dnd';
// import flow from 'lodash.flow';
//
// const widgetSource = {
//   beginDrag({ cellIndex }) {
//     return { cellIndex };
//   },
//   endDrag(props, monitor, component) {
//     if (!monitor.didDrop()) {
//       return;
//     }
//     const item = monitor.getItem();
//     const dropResult = monitor.getDropResult();
//     if (item !== dropResult) {
//       props.swapWidgetPosition(item, dropResult);
//     }
//     if (props === component) {
//       return;
//     }
//   }
// };
// function collectSource(connect, monitor) {
//   return {
//     connectDragSource: connect.dragSource(),
//     isDragging: monitor.isDragging()
//   };
// }
// const widgetTarget = {
//   drop({ cellIndex }) {
//     return { cellIndex };
//   }
// };
//
// function collectTarget(connect, monitor) {
//   return {
//     connectDropTarget: connect.dropTarget(),
//     isOver: monitor.isOver()
//   };
// }
//
// function dragSourceTarget(ComposedComponent) {
//   return flow(
//     dragSource('widget', widgetSource, collectSource),
//     dropTarget('widget', widgetTarget, collectTarget)
//   )(
//     class DragSourceTarget extends Component {
//       static propTypes = {
//         connectDragSource: PropTypes.func.isRequired,
//         connectDropTarget: PropTypes.func.isRequired
//       };
//       static shouldComponentUpdate() {
//         return false;
//       }
//       render() {
// <<<<<<< HEAD
// <<<<<<< HEAD
//         const { connectDragSource, connectDropTarget, className } = this.props;
//         return (
//           connectDragSource(connectDropTarget(
//             <div style={{maxHeight: '115px'}} className={className}>
// =======
//         const { connectDragSource, connectDropTarget } = this.props;
//         return (
//           connectDragSource(connectDropTarget(
//             <div>
// >>>>>>> origin/dev
// =======
//         const { connectDragSource, connectDropTarget, className, cellHeight } = this.props;
//         return (
//           connectDragSource(connectDropTarget(
//             <div style={{height: `${cellHeight}%`, padding: '15px'}} className={className}>
// >>>>>>> e51aa3ece7c80b3570cb73327b276d642f81b208
//               <ComposedComponent {...this.props} />
//             </div>
//           ))
//         );
//       }
//     });
// }
//
// export default dragSourceTarget;
