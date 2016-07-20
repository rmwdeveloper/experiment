import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './LayoutCell.css'; //eslint-disable-line
import cx from 'classnames';

function LayoutCell({ children, gridVisible, minHeight }) {
  const border = gridVisible ? '1px dashed black' : 'medium none';
  return (
    <div style={{border, minHeight: `${minHeight}%`}} className={styles.root}>
    </div>
  );
}

LayoutCell.propTypes = {
  children: PropTypes.element
};
export default LayoutCell;
