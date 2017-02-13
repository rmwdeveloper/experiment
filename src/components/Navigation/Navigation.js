import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Navigation.css'; //eslint-disable-line
import Link from '../Link';
import ReactPerfButton  from '../ReactPerfButton';
import DisplayEditingMode  from '../DisplayEditingMode';
import cx from 'classnames';

function Navigation() {
  return (
    <header id="primaryHeader" className={`${styles.root} row start-lg center-md center-xs`} role="navigation">
      <div className={`${styles.linkContainer} col-lg-12 around-lg`}>
        <Link className={styles.link} to="/">
          <span className={styles.desktop}>Robert Westenberger</span>
          <span className={styles.mobile}>RMW</span>
        </Link>
        <Link className={styles.link} to="/console">
          <span className={styles.desktop}>Console</span>
          <span className={styles.mobile}><i className="fa fa-code" /></span>
        </Link>
        <Link className={styles.link} to="/windows">
          <span className={styles.desktop}>Windows</span>
          <span className={styles.mobile}><i className="fa fa-windows" /></span>
        </Link>


        {__DEV__ ? <ReactPerfButton className={cx(styles.link, styles.devOnly)} /> : null}
        {__DEV__ ? <DisplayEditingMode className={cx(styles.link, styles.devOnly)} /> : null}
      </div>
    </header>
  );
}

export default withStyles(styles)(Navigation);
