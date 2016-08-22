import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './WindowsDesktopItemGroup.css'; //eslint-disable-line
import cx from 'classnames';

function WindowsDesktopItemGroup({ item, index }) {
  return (
    <div data-index={index} className={cx('desktopIcon', styles.root)}>
      <img className={styles.icon} src={item.icon} alt={`${item.name} icon`} />
      <span className={styles.directoryName}> {item.name}</span>
    </div>
  );
}

WindowsDesktopItemGroup.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number
};
export default withStyles(styles)(WindowsDesktopItemGroup);
