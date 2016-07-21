import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './LayoutColumn.css'; //eslint-disable-line
import cx from 'classnames';

function LayoutColumn({ children, classNumber }) {
  return (
    <div
      className={cx(styles.root,
      `col-lg-${classNumber} col-md-${classNumber} col-sm-12 col-xs-12`)}
    >
      {React.Children.map(children, child => { // eslint-disable-line
        return child;
      })}
    </div>
  );
}

LayoutColumn.propTypes = {
  children: PropTypes.array,
  classNumber: PropTypes.number
};
export default withStyles(styles)(LayoutColumn);
