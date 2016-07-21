import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './CellActions.css'; //eslint-disable-line
import cx from 'classnames';
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
          <i
            onClick={() => { toggleEditCellMode(cellIndex); }}
            style={{ fontSize: `${rowWidth * (columnHeight * 2) / 150}rem` }}
            className={cx(styles.addWidget, 'fa fa-plus')}
          />
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
