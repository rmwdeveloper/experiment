import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Navigation.css'; //eslint-disable-line
import Link from '../Link';
import ReactPerfButton  from '../ReactPerfButton';
import cx from 'classnames';

function Navigation() {
  return (
    <header className={`${styles.root} row start-lg center-md center-xs`} role="navigation">
      <div className={`${styles.linkContainer} col-lg-12 around-lg`}>
        <Link className={styles.link} to="/"> Robert Westenberger </Link>
        <Link className={styles.link} to="/console">Console</Link>
        <Link className={styles.link} to="/windows">Windows</Link>


        {__DEV__ ? <ReactPerfButton className={cx(styles.link, styles.devOnly)} /> : null}
      </div>
    </header>
  );
}

export default withStyles(styles)(Navigation);
