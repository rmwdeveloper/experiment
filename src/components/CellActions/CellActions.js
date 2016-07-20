import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './CellActions.css'; //eslint-disable-line
import cx from 'classnames';

function CellActions({rowWidth, columnHeight}) {
  console.log(rowWidth, columnHeight);
  return (
    <div className={styles.root}>
      <i style={{ fontSize: `${rowWidth / 5}rem`}} className={cx(styles.addWidget, "fa fa-plus")} />
    </div>
  );
}

export default withStyles(styles)(CellActions);
