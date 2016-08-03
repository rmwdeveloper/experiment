import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './WindowsDesktopItem.css'; //eslint-disable-line

function WindowsDesktopItem({ item }) {
  return (
    <div className={styles.root}>
      <img className={styles.icon} src={item.icon} alt={`${item.name} icon`} />
      <span className={styles.directoryName}> {item.name}</span>
    </div>
  );
}

WindowsDesktopItem.propTypes = {

};
export default withStyles(styles)(WindowsDesktopItem);
