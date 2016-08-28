import React, { PropTypes } from 'react';
import styles from './WindowsFolder.css'; //eslint-disable-line
import withStyles from 'isomorphic-style-loader/lib/withStyles';


function WindowsFolder({ entityID }) {
  return (
    <div className={styles.root}>
      Windows Folder {entityID}
    </div>
  );
}

WindowsFolder.propTypes = {
  entityID: PropTypes.number
};
export default withStyles(styles)(WindowsFolder);
