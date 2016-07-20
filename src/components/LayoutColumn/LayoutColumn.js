import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './LayoutColumn.css'; //eslint-disable-line
import cx from 'classnames';

function LayoutColumn({children}) {
  return (
    <div>
      {React.Children.map(children, child => {
        return child;
      })}
    </div>
  );
}

export default withStyles(styles)(LayoutColumn);
