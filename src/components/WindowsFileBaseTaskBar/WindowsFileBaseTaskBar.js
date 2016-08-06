import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './WindowsFileBaseTaskBar.css'; //eslint-disable-line
import cx from 'classnames';

function WindowsFileBaseTaskBar(component) {

  return class extends React.Component {
    render() {
      return <component />;
    }
  }
}


WindowsFileBaseTaskBar.propTypes = {};
export default withStyles(styles)(WindowsFileBaseTaskBar);
