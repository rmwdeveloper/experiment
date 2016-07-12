import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './StockDashboardNavigation.css'; //eslint-disable-line
import Link from '../Link';


function StockDashboardNavigation() {
  return (
    <header className={`${styles.root}  row center-xs`} role="navigation">
      <div className={`${styles.linkContainer} col-xs`}>
        <Link className={styles.link} to="/stocks/search"><i className="fa fa-2x fa-search" /></Link>
        <Link className={styles.link} to="/stocks/explore"><i className="fa fa-2x fa-compass" /></Link>
        <Link className={styles.link} to="/stocks/pick"><i className="fa fa-2x fa-industry" /></Link>
        <Link className={styles.link} to="/stocks/watchlist"><i className="fa fa-2x fa-eye" /></Link>
        <Link className={styles.link} to="/stocks/alerts"><i className="fa fa-2x fa-exclamation" /></Link>
      </div>
    </header>
  );
}

export default withStyles(styles)(StockDashboardNavigation);
