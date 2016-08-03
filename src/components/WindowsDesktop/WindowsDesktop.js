import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './WindowsDesktop.css'; //eslint-disable-line

import WindowsDesktopItem from '../WindowsDesktopItem';

function WindowsDesktop({ desktopItems }) {
  return (
    <div className={styles.root}>
      {
        desktopItems.map(desktopitem => {
          return <WindowsDesktopItem item={desktopitem} />;
        })
      }
    </div>
  );
}

WindowsDesktop.propTypes = {

};
export default withStyles(styles)(WindowsDesktop);
