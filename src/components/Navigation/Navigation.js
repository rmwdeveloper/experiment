import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Navigation.css';
import Link from '../Link';


function Navigation() {
  return (
    <div className={`${styles.root} row center-md`} role="navigation">
      <div className="col-md-12">
        <Link to="/"> Robert Westenberger </Link>
        <Link to="/contact"> Robert Westenberger </Link>
        <Link to="/about"> Robert Westenberger </Link>
      </div>
    </div>
  );
}

export default withStyles(styles)(Navigation);
