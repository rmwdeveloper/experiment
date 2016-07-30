import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './WindowsStartMenuFooter.css'; //eslint-disable-line

class WindowsStartMenuFooter extends Component {

  render() {
    return (
      <div className={styles.root}>
        WindowsStartMenuFooter
      </div>
    );
  }
}

WindowsStartMenuFooter.propTypes = {

};
export default withStyles(styles)(WindowsStartMenuFooter);
