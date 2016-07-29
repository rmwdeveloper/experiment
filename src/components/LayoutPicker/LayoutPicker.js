import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './LayoutPicker.css'; //eslint-disable-line
import cx from 'classnames';

function LayoutPicker({ className }) {
  return (
    <div className={cx(className, styles.root)}>
      <div>Hello World</div>
    </div>);
}

LayoutPicker.propTypes = {
};
export default withStyles(styles)(LayoutPicker);
