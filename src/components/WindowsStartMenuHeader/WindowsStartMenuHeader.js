import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './WindowsStartMenuHeader.css'; //eslint-disable-line

class WindowsStartMenuHeader extends Component {

  render() {
    return (
      <div className={styles.root}>
        WindowsStartMenuHeader
      </div>
    );
  }
}

WindowsStartMenuHeader.propTypes = {

};
export default withStyles(styles)(WindowsStartMenuHeader);
