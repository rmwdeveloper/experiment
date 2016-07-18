import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './StockDashboardNavigation.css'; //eslint-disable-line
import Link from '../Link';
import cx from 'classnames';

function StockDashboardNavigation({toggleMode}) {
  return (
    <header className={`${styles.root}  row center-xs`} role="navigation">
      <div className={`${styles.linkContainer} col-xs`}>
        <a onClick={() => toggleMode('layout')} className={styles.link}>
          <span className={styles.desktop}>Layout Mode</span>
          <i className={cx('fa fa-2x fa-search', styles.mobile)} />
        </a>
        <a onClick={() => toggleMode('preview')} className={styles.link}>
          <span className={styles.desktop}>Preview Mode</span>
          <i className={cx('fa fa-2x fa-compass', styles.mobile)} />
        </a>
        <a className={styles.link}>
          <span className={styles.desktop}>AutoSave</span>
          <i className={cx('fa fa-2x fa-industry', styles.mobile)} />
        </a>
      </div>
    </header>
  );
}

export default withStyles(styles)(StockDashboardNavigation);
