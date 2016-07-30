import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './WindowsStartMenu.css'; //eslint-disable-line

class WindowsStartMenu extends Component {

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div className={styles.root}>
        start menu
      </div>
    );
  }
}

WindowsStartMenu.propTypes = {

};
export default withStyles(styles)(WindowsStartMenu);
