import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './LayoutCell.css'; //eslint-disable-line
import CellActions from '../CellActions';
import dragSourceTarget from '../DragSourceTarget/DragSourceTarget';

function LayoutCell({
  children, addStockWidget, mode,
  gridVisible, columnHeight, rowWidth, widget, propsObj, cellIndex, toggleEditCellMode,
  editing
}) {
  const border = gridVisible ? '1px dashed black' : 'medium none';
  let visibility = mode === 'preview' ? 'hidden' : 'visible';
  if (widget) {
    visibility = 'visible';
  }
  return (
    <div style={{ border, visibility, minHeight: `${columnHeight}%` }} className={styles.root}>
      {
        widget ?

          React.createElement(widget, { ...propsObj, cellIndex })

          : <CellActions
            addStockWidget={addStockWidget}
            editing={editing}
            cellIndex={cellIndex}
            toggleEditCellMode={toggleEditCellMode}
            rowWidth={rowWidth}
            columnHeight={columnHeight}
          />
      }
    </div>
  );
}

LayoutCell.propTypes = {
  children: PropTypes.element,
  addStockWidget: PropTypes.func,
  mode: PropTypes.string,
  gridVisible: PropTypes.bool,
  columnHeight: PropTypes.number,
  rowWidth: PropTypes.number,
  widget: PropTypes.func,
  propsObj: PropTypes.object,
  cellIndex: PropTypes.string,
  toggleEditCellMode: PropTypes.func,
  editing: PropTypes.bool
};
export default dragSourceTarget(withStyles(styles)(LayoutCell));
