import React, { PropTypes } from 'react';
import styles from './DiskManager.css'; //eslint-disable-line
import withStyles from 'isomorphic-style-loader/lib/withStyles';



function DiskManager({}) {
  return <div className={styles.root}>
    disk manager
  </div>;
}

DiskManager.propTypes = {
  entityID: PropTypes.number
};
export default withStyles(styles)(DiskManager);
