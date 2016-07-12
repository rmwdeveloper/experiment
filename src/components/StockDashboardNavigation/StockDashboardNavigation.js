import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './StockDashboardNavigation.css'; //eslint-disable-line
import Link from '../Link';


function StockDashboardNavigation() {
  return (
    <header className={`${styles.root}  row center-xs`} role="navigation">
      <div className={`${styles.linkContainer} col-xs`}>
        <Link className={styles.link} to="/stocks/search"><i className="fa fa-search" /></Link>
        <Link className={styles.link} to="/stocks/explore"><i className="fa fa-compass" /></Link>
        <Link className={styles.link} to="/stocks/pick"><i className="fa fa-industry" /></Link>
        <Link className={styles.link} to="/stocks/watchlist"><i className="fa fa-eye" /></Link>
        <Link className={styles.link} to="/stocks/alerts"><i className="fa fa-exclamation" /></Link>
      </div>
    </header>
  );
}

export default withStyles(styles)(StockDashboardNavigation);
