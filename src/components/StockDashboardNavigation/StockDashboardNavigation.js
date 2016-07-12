import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './StockDashboardNavigation.css'; //eslint-disable-line
import Link from '../Link';
import cx from 'classnames';

function StockDashboardNavigation() {
  return (
    <header className={`${styles.root}  row center-xs`} role="navigation">
      <div className={`${styles.linkContainer} col-xs`}>
        <Link className={styles.link} to="/stocks/search">
          <span className={styles.desktop}>Search</span>
          <i className={cx('fa fa-2x fa-search', styles.mobile)} />
        </Link>
        <Link className={styles.link} to="/stocks/explore">
          <span className={styles.desktop}>Explore</span>
          <i className={cx('fa fa-2x fa-compass', styles.mobile)} />
        </Link>
        <Link className={styles.link} to="/stocks/pick">
          <span className={styles.desktop}>Pick</span>
          <i className={cx('fa fa-2x fa-industry', styles.mobile)} />
        </Link>
        <Link className={styles.link} to="/stocks/watchlist">
          <span className={styles.desktop}>Watch</span>
          <i className={cx('fa fa-2x fa-eye', styles.mobile)} />
        </Link>
        <Link className={styles.link} to="/stocks/alerts">
          <span className={styles.desktop}>Alerts</span>
          <i className={cx('fa fa-2x fa-exclamation', styles.mobile)} />
        </Link>
      </div>
    </header>
  );
}

export default withStyles(styles)(StockDashboardNavigation);
