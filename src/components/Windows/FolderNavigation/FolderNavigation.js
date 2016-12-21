import React, { PropTypes } from 'react';
import styles from './FolderNavigation.css'; //eslint-disable-line
import withStyles from 'isomorphic-style-loader/lib/withStyles';


function FolderNavigation() {


  return (
    <div className={styles.root}>
      folder navigation
    </div>
  );
}

FolderNavigation.propTypes = {

};
export default withStyles(styles)(FolderNavigation);
