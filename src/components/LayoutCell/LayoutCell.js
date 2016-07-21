import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './LayoutCell.css'; //eslint-disable-line
import CellActions from '../CellActions';
import dragSourceTarget from '../DragSourceTarget/DragSourceTarget';

function LayoutCell({
  addStockWidget, mode,
  gridVisible, columnHeight, rowWidth, widget, cellIndex, toggleEditCellMode,
  editing, ...props
}) {
  const border = gridVisible ? '1px dashed black' : 'medium none';
  let visibility = mode === 'preview' ? 'hidden' : 'visible';
  const style = { border };
  if (widget) {
    visibility = 'visible';
  } else {
    style.height = `${columnHeight * 8.8}px`;
    style.visibility = visibility;
  }

  return (
    <div style={style} className={styles.root}>
      {
        widget ?

          React.createElement(widget, { cellIndex, ...props })

          : <CellActions
            addStockWidget={addStockWidget}
            editing={editing}
            cellIndex={cellIndex}
            toggleEditCellMode={toggleEditCellMode}
            rowWidth={rowWidth}
            columnHeight={columnHeight}
          {...props}
          />
      }
    </div>
  );
}

LayoutCell.propTypes = {
  addStockWidget: PropTypes.func,
  mode: PropTypes.string,
  gridVisible: PropTypes.bool,
  columnHeight: PropTypes.number,
  rowWidth: PropTypes.number,
  widget: PropTypes.func,
  cellIndex: PropTypes.string,
  toggleEditCellMode: PropTypes.func,
  editing: PropTypes.bool
};
export default dragSourceTarget(withStyles(styles)(LayoutCell));
