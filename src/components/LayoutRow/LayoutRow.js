import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './LayoutRow.css'; //eslint-disable-line
import LayoutCell from '../LayoutCell';

function LayoutRow({ gridVisible, propsObj,
  rowWidth, addStockWidget, columnHeight, widget, cellIndex, toggleEditCellMode,
  editing, mode }) {
  return (
    <LayoutCell
      mode={mode}
      propsObj={propsObj}
      addStockWidget={addStockWidget}
      cellIndex={cellIndex}
      toggleEditCellMode={toggleEditCellMode}
      editing={editing}
      widget={widget}
      columnHeight={columnHeight}
      rowWidth={rowWidth}
      gridVisible={gridVisible}
    />
  );
}

LayoutRow.propTypes = {
  gridVisible: PropTypes.func,
  propsObj: PropTypes.object,
  rowWidth: PropTypes.number,
  addStockWidget: PropTypes.func,
  columnHeight: PropTypes.number,
  widget: PropTypes.object,
  cellIndex: PropTypes.string,
  toggleEditCellMode: PropTypes.func,
  editing: PropTypes.bool,
  mode: PropTypes.string
};
export default withStyles(styles)(LayoutRow);
