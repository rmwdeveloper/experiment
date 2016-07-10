import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Navigation.css';
import Link from '../Link';


function Navigation() {
  return (
    <div className={`${styles.root} row center-md col-lg-4`} role="navigation">
      <div className="col-md-12">
        <Link className={styles.link} to="/"> Robert Westenberger </Link>
        <Link className={styles.link} to="/contact"> Animations </Link>
        <Link className={styles.link} to="/about"> Algorithms </Link>
      </div>
    </div>
  );
}

export default withStyles(styles)(Navigation);
