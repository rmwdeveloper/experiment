import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './LayoutColumn.css'; //eslint-disable-line
import cx from 'classnames';

function LayoutColumn({ className, children }) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

export default withStyles(styles)(LayoutColumn);
