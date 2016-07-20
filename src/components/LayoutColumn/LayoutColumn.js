import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './LayoutColumn.css'; //eslint-disable-line
import cx from 'classnames';

function LayoutColumn({children, classNumber}) {
  return (
    <div className={cx(styles.root, `col-lg-${classNumber} col-md-${classNumber} col-sm-${classNumber} col-xs-${classNumber}`)}>
      {React.Children.map(children, child => {
        return child;
      })}
    </div>
  );
}

export default withStyles(styles)(LayoutColumn);
