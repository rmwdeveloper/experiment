import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './CellActions.css'; //eslint-disable-line
import cx from 'classnames';

function CellActions() {
  return (
    <div className={cx(styles.root, 'row')}>

    </div>
  );
}

export default withStyles(styles)(CellActions);
