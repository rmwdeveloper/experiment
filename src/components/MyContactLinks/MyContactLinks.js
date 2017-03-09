import React, { PropTypes, Component} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';

import styles from './MyContactLinks.css'; //eslint-disable-line



function MyContactLinks() {
  return (<ul className={styles.root}>
    <li><a href="https://linkedin.com/in/robert-westenberger"><i className="fa fa-linkedin" /></a></li>
    <li><a href="https://github.com/rmwdeveloper"><i className="fa fa-github-alt" /></a></li>
    <li><a href="mailto:rmwdeveloper@gmail.com"><i className="fa fa-envelope-o" /></a></li>
    <li><a href="tel:+9734761264"><i className="fa fa-mobile-phone" /></a></li>
  </ul>);
}


export default withStyles(styles)(MyContactLinks);
