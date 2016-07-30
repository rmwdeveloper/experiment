import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './WindowsStartMenuProgramsListing.css'; //eslint-disable-line

class WindowsStartMenuProgramsListing extends Component {

  render() {
    return (
      <div className={styles.root}>
        WindowsStartMenuProgramsListing
      </div>
    );
  }
}

WindowsStartMenuProgramsListing.propTypes = {

};
export default withStyles(styles)(WindowsStartMenuProgramsListing);
