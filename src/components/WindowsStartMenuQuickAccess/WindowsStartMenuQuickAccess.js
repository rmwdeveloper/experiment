import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './WindowsStartMenuQuickAccess.css'; //eslint-disable-line

class WindowsStartMenuQuickAccess extends Component {

  render() {
    return (
      <div className={styles.root}>
        WindowsStartMenuQuickAccess
      </div>
    );
  }
}

WindowsStartMenuQuickAccess.propTypes = {

};
export default withStyles(styles)(WindowsStartMenuQuickAccess);
