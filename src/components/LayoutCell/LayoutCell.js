import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './LayoutCell.css'; //eslint-disable-line
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

function LayoutCell({ children, gridVisible }) {
  const border = gridVisible ? '1px dashed black' : 'medium none';
  return (
    <div style={{border}} className={cx({root: true}, {gridVisible})}>
      Layout Cell
    </div>
  );
}

LayoutCell.propTypes = {
  children: PropTypes.element
};
export default LayoutCell;
