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
    layoutIndicies: PropTypes.array
  };
  constructor(){
    super();
    this.state = {
      resizeStartX: null,
      resizeStartY: null,
      pageX: null,
      pageY: null,
      resizing: false,
    };
    this.resize = this.resize.bind(this);
    this.startResize = this.startResize.bind(this);
    this.endResize = this.endResize.bind(this);

  }
  resize(event) {
    event.preventDefault();
    const { pageX, pageY } = event;
    this.setState({pageX, pageY});
    const { resizeStartX, resizeStartY } = this.state;
  }
  startResize(event) {
    event.preventDefault();
    this.setState({resizeStartX: event.pageX, resizeStartY: event.pageY, resizing: true});
    this.mouseUp = window.addEventListener('mouseup', this.endResize);
    this.mouseMove = window.addEventListener('mousemove', this.resize);
  }
  endResize(){
    this.setState({resizing: false, pageX: this.state.resizeStartX, pageY: this.state.resizeStartY});
    window.removeEventListener('mouseup', this.endResize);
    window.removeEventListener('mousemove', this.resize);
  }
  componentDidMount() {
    this.dashBoard = document.getElementById('stockDashboard');
  }
  render() {
    const { mode, gridVisible, columnHeight, widget, rowWidth, layoutIndices, addStockWidget, toggleEditCellMode, cellIndex, editing } = this.props;
    const { resizing, pageX, pageY } = this.state;
    const border = gridVisible ? '1px dashed black' : 'medium none';
    let visibility = mode === 'preview' ? 'hidden' : 'visible';
    const style = { border };
    if (widget) {
      visibility = 'visible';
    } else {
      // style.height = `${columnHeight * 8.8}px`;
      style.visibility = visibility;
    }
    if (resizing) {
      style.width = `${pageX}px`;
      style.height = `${pageY - 100}px`;
    }
    return (
      <div style={style} className={styles.root}>
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
        <span onMouseDown={this.startResize} className={styles.resizeHandle}> </span>
      </div>
    );
  }
}

export default dragSourceTarget(withStyles(styles)(LayoutCell));
