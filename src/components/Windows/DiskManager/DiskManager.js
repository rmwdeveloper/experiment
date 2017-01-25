import React, { PropTypes } from 'react';
import styles from './DiskManager.css'; //eslint-disable-line
import withStyles from 'isomorphic-style-loader/lib/withStyles';



function DiskManager({diskSpace, usedSpace, user}) {
  return <div className={styles.root}>
    {diskSpace} {usedSpace}
    <div className={styles.spaceAvailable}>
      <span> {diskSpace} {usedSpace}</span>
      <span>Total Space Available: {diskSpace - usedSpace}</span>
    </div>
  </div>;
}

DiskManager.propTypes = {
  entityID: PropTypes.number
};
export default withStyles(styles)(DiskManager);
