import React, { PropTypes } from 'react';
import styles from './FolderSidebar.css'; //eslint-disable-line
import withStyles from 'isomorphic-style-loader/lib/withStyles';


function FolderSidebar() {


  return (
    <div className={styles.root}>
      folder sidebar
    </div>
  );
}

FolderSidebar.propTypes = {

};
export default withStyles(styles)(FolderSidebar);
