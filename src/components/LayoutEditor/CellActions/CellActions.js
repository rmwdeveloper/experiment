import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './CellActions.css'; //eslint-disable-line
import ScrollableAddMenu from '../ScrollableAddMenu';

function CellActions({ rowWidth,
  columnHeight, toggleEditCellMode, cellIndex, addStockWidget, editing }) {
  return (
    <div className={styles.root}>
      {
        editing ?
          <ScrollableAddMenu
            addStockWidget={addStockWidget}
            cellIndex={cellIndex}
            columnHeight={columnHeight}
            key={cellIndex}
          />
          :
          <div
            className={styles.addWidget}
            onClick={() => { toggleEditCellMode(cellIndex); }}
          ></div>
      }
    </div>
  );
}

CellActions.propTypes = {
  rowWidth: PropTypes.number,
  columnHeight: PropTypes.number,
  toggleEditCellMode: PropTypes.func,
  cellIndex: PropTypes.string,
  addStockWidget: PropTypes.func,
  editing: PropTypes.bool
};
export default withStyles(styles)(CellActions);
