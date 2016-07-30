import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './WindowsStartMenuProgramsListItem.css'; //eslint-disable-line

class WindowsStartMenuProgramsListItem extends Component {

  render() {
    return (
      <div className={styles.root}>
        WindowsStartMenuProgramsListItem
      </div>
    );
  }
}

WindowsStartMenuProgramsListItem.propTypes = {

};
export default withStyles(styles)(WindowsStartMenuProgramsListItem);
