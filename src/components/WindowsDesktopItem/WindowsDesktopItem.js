import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './WindowsDesktopItem.css'; //eslint-disable-line
import cx from 'classnames';

function WindowsDesktopItem({ item  }) {
  return (
    <div data-index={item.index} className={cx('desktopIcon', styles.root)}>
      <img className={styles.icon} src={item.icon} alt={`${item.name} icon`} />
      <span className={styles.directoryName}> {item.name}</span>
    </div>
  );
}

WindowsDesktopItem.propTypes = {

};
export default withStyles(styles)(WindowsDesktopItem);
