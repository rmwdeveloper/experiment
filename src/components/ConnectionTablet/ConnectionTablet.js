import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './ConnectionTablet.css'; //eslint-disable-line
import cx from 'classnames';

function ConnectionsTablet({title, amount, className}) {
  return (
    <div className={cx(styles.root, className)}>
      <div className={styles.title}>
        <a href="#">{title}</a>
      </div>
      <div className={styles.amount}>
        <a href="#">{amount}</a>
      </div>
    </div>
  );
}

export default withStyles(styles)(ConnectionsTablet);
