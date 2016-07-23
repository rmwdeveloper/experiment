import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './LayoutRow.css'; //eslint-disable-line
import LayoutCell from '../LayoutCell';

function LayoutRow({ gridVisible,
  rowWidth, addStockWidget, columnHeight, widget, cellIndex, toggleEditCellMode,
  editing, mode, ...props }) {
  return (
    <LayoutCell
      mode={mode}
      addStockWidget={addStockWidget}
      cellIndex={cellIndex}
      toggleEditCellMode={toggleEditCellMode}
      editing={editing}
      widget={widget}
      columnHeight={columnHeight}
      rowWidth={rowWidth}
      gridVisible={gridVisible}
      {...props}
    />
  );
}

LayoutRow.propTypes = {
  gridVisible: PropTypes.bool,
  rowWidth: PropTypes.number,
  addStockWidget: PropTypes.func,
  columnHeight: PropTypes.number,
  widget: PropTypes.func,
  cellIndex: PropTypes.string,
  toggleEditCellMode: PropTypes.func,
  editing: PropTypes.bool,
  mode: PropTypes.string
};
export default withStyles(styles)(LayoutRow);
