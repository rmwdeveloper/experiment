import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Navigation.css';
import Link from '../Link';


function Navigation() {
  return (
    <header className={`${styles.root} row start-lg center-md center-xs`} role="navigation">
      <div className={`${styles.linkContainer} col-lg-12 around-lg`}>
        <Link className={styles.link} to="/"> Robert Westenberger </Link>
        <Link className={styles.link} to="/contact"> Animations </Link>
        <Link className={styles.link} to="/about"> Algorithms </Link>
      </div>
    </header>
  );
}

export default withStyles(styles)(Navigation);
