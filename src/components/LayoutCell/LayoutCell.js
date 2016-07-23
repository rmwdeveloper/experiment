import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './LayoutCell.css'; //eslint-disable-line
import CellActions from '../CellActions';
import dragSourceTarget from '../DragSourceTarget/DragSourceTarget';

class LayoutCell extends Component {
  static propTypes = {
    addStockWidget: PropTypes.func,
    mode: PropTypes.string,
    gridVisible: PropTypes.bool,
    columnHeight: PropTypes.number,
    rowWidth: PropTypes.number,
    widget: PropTypes.func,
    cellIndex: PropTypes.string,
    toggleEditCellMode: PropTypes.func,
    editing: PropTypes.bool,
    layoutIndices: PropTypes.array
  };

  constructor() {
    super();
    this.state = {
      resizing: false,
      cornerClicked: null,
      initialClickPageX: null,
      initialClickCellWidth: null,
      width: null,
      initialClickPageY: null,
      initialClickCellHeight: null,
      height: null,
      minHeight: null,
      transform: null
    };
    this.initialMinHeight = 100;
    this.resize = this.resize.bind(this);
    this.startResize = this.startResize.bind(this);
    this.endResize = this.endResize.bind(this);

  }

  resize(event) {
    event.preventDefault();
    const { pageX, pageY } = event;
    const {
      cornerClicked, initialClickPageX, initialClickCellWidth, initialClickPageY,
      initialClickCellHeight
    } = this.state;
    const xDirection = pageX < initialClickPageX ? 'left' : 'right';
    const yDirection = pageY < initialClickPageY ? 'up' : 'down';
    const movedX = pageX - initialClickPageX;
    const movedY = pageY - initialClickPageY;

    let transform = null;
    let width = null;
    let height = null;
    let minHeight = null;

    switch (cornerClicked) {
      case 'bottomRight':
        width = xDirection === 'right' ? `${initialClickCellWidth + movedX}px` : `${initialClickCellWidth + movedX}px`;
        height = `${initialClickCellHeight + movedY}px`;
        minHeight = `${initialClickCellHeight + movedY}px`;
        break;
      case 'bottomLeft':
        if ((movedX > initialClickCellWidth) && xDirection === 'right') {
          return null;
        }
        width = xDirection === 'right' ? `${initialClickCellWidth - movedX}px` : `${initialClickCellWidth + Math.abs(movedX)}px`;
        height = `${initialClickCellHeight + movedY}px`;
        minHeight = `${initialClickCellHeight + movedY}px`;
        transform = `translateX(${movedX}px)`;
        break;
      case 'topRight':
        if ((pageY - 100) < 0 || yDirection === 'down') {
          return null;
        }
        transform = `translateY(${movedY}px)`;
        height = `${initialClickCellHeight + Math.abs(movedY)}px`;
        minHeight = `${initialClickCellHeight + Math.abs(movedY)}px`;
        width = xDirection === 'right' ? `${initialClickCellWidth + movedX}px` : `${initialClickCellWidth + movedX}px`;
        break;
      case 'topLeft':

        if ((pageY - 100) < 0 || yDirection === 'down') {
          return null;
        }
        transform = `translateY(${movedY}px) translateX(${movedX}px)`;
        height = `${initialClickCellHeight + Math.abs(movedY)}px`;
        minHeight = `${initialClickCellHeight + Math.abs(movedY)}px`;
        width = xDirection === 'right' ? `${initialClickCellWidth - movedX}px` : `${initialClickCellWidth + Math.abs(movedX)}px`;
        break;
      default:
        break;
    }
    this.setState({ width, transform, height, minHeight });
  }

  startResize(event, cornerClicked) {
    event.preventDefault();

    switch (cornerClicked) {
      case 'bottomRight':

        break;
      case 'bottomLeft':
        break;
      case 'topRight':

        break;
      case 'topLeft':

        break;
      default:
        break;
    }

    this.setState({
      resizing: true,
      initialClickPageX: event.pageX,
      initialClickCellWidth: this.widgetCell.offsetWidth,
      initialClickPageY: event.pageY,
      initialClickCellHeight: this.widgetCell.offsetHeight,
      cornerClicked,

    });
    this.mouseUp = window.addEventListener('mouseup', this.endResize);
    this.mouseMove = window.addEventListener('mousemove', this.resize);
  }

  endResize() {
    this.setState({
      resizing: false,
      initialClickPageX: null,
      initialClickCellWidth: null,
      initialClickPageY: null,
      initialClickCellHeight: null,
      cornerClicked: null,
      height: null,
      minHeight:null,
      width: null,
      transform: null
    });
    window.removeEventListener('mouseup', this.endResize);
    window.removeEventListener('mousemove', this.resize);
  }

  componentDidMount() {
    this.dashBoard = document.getElementById('stockDashboard');
    this.widgetCell = document.getElementById(`cell${this.props.layoutIndices[0]}`);
    this.widgetWidth = this.widgetCell.offsetWidth;
    this.widgetRect = this.widgetCell.getBoundingClientRect();
  }

  componentDidUpdate() {
    this.widgetCell = document.getElementById(`cell${this.props.layoutIndices[0]}`);
  }

  render() {
    const { mode, gridVisible, columnHeight, widget, rowWidth, layoutIndices, addStockWidget, toggleEditCellMode, cellIndex, editing } = this.props;
    const { resizing, transform, width, height, minHeight } = this.state;
    const border = gridVisible ? '1px dashed black' : 'medium none';
    let visibility = mode === 'preview' ? 'hidden' : 'visible';
    const style = { border };
    if (resizing) {
      style.height = height;
      style.minHeight = minHeight;
      style.width = width;
      style.transform = transform;
    }
    if (widget) {
      visibility = 'visible';
    } else {
      // style.height = `${columnHeight * 8.8}px`;
      style.visibility = visibility;
    }
    return (
      <div id={`cell${layoutIndices[0]}`} style={style} className={styles.root}>
        <div id={`inner${layoutIndices[0]}`} style={{position: 'absolute'}}>
          {layoutIndices}
          {
            widget ?

              React.createElement(widget, { cellIndex, ...this.props })

              : <CellActions
              addStockWidget={addStockWidget}
              editing={editing}
              cellIndex={cellIndex}
              toggleEditCellMode={toggleEditCellMode}
              rowWidth={rowWidth}
              columnHeight={columnHeight}
              {...this.props}
            />
          }

        </div>
        <span style={{cursor: 'nwse-resize', bottom: '-5px', right: '-5px'}}
              onMouseDown={(event) => { this.startResize(event, 'bottomRight'); }}
              className={styles.resizeHandle}> </span>
          <span style={{cursor: 'nesw-resize', bottom: '-5px', left: '-5px'}}
                onMouseDown={(event) => { this.startResize(event, 'bottomLeft'); }}
                className={styles.resizeHandle}> </span>
          <span style={{cursor: 'nesw-resize', top: '-5px', right: '-5px'}}
                onMouseDown={(event) => { this.startResize(event, 'topRight'); }}
                className={styles.resizeHandle}> </span>
          <span style={{cursor: 'nwse-resize', top: '-5px', left: '-5px'}}
                onMouseDown={(event) => { this.startResize(event, 'topLeft'); }}
                className={styles.resizeHandle}> </span>
      </div>
    );
  }
}

export default dragSourceTarget(withStyles(styles)(LayoutCell));
