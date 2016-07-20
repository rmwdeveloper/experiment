import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './LayoutCell.css'; //eslint-disable-line
import cx from 'classnames';
import CellActions from '../CellActions';
function LayoutCell({ children, gridVisible, minHeight, widget }) {
  const border = gridVisible ? '1px dashed black' : 'medium none';
  return (
    <div style={{border, minHeight: `${minHeight}%`}} className={styles.root}>
      {
        widget ? widget : <CellActions />
      }
    </div>
  );
}

LayoutCell.propTypes = {
  children: PropTypes.element
};
export default LayoutCell;
