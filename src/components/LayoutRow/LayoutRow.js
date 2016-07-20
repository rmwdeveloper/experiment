import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './LayoutRow.css'; //eslint-disable-line
import cx from 'classnames';

import LayoutCell from '../LayoutCell';

function LayoutRow({gridVisible, rowWidth, columnHeight, widget, cellIndex, toggleEditCellMode, editing}) {

  return (
    <LayoutCell
      cellIndex={cellIndex}
      toggleEditCellMode={toggleEditCellMode}
      editing={editing}
      widget={widget}
      columnHeight={columnHeight}
      rowWidth={rowWidth}
      gridVisible={gridVisible} />
  );
}

export default withStyles(styles)(LayoutRow);
