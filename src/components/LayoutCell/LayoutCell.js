import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './LayoutCell.css'; //eslint-disable-line
import cx from 'classnames';
import CellActions from '../CellActions';

function LayoutCell({ children, addStockWidget,
  gridVisible, columnHeight, rowWidth, widget, propsObj, cellIndex, toggleEditCellMode, editing }) {
  const border = gridVisible ? '1px dashed black' : 'medium none';
  return (
    <div style={{border, minHeight: `${columnHeight}%`}} className={styles.root}>
      {
        widget ?

          React.createElement(widget, {...propsObj, cellIndex})

          : <CellActions addStockWidget={addStockWidget} editing={editing} cellIndex={cellIndex} toggleEditCellMode={toggleEditCellMode}
          rowWidth={rowWidth}
          columnHeight={columnHeight} />
      }
    </div>
  );
}

LayoutCell.propTypes = {
  children: PropTypes.element
};
export default withStyles(styles)(LayoutCell)
