import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './DesktopItemsGroup.css'; //eslint-disable-line
import cx from 'classnames';

function DesktopItemGroup({ item, index }) {
  return (
    <div data-index={index} className={cx('desktopIcon', styles.root)}>
      <img className={styles.icon} src={item.icon} alt={`${item.name} icon`} />
      <span className={styles.directoryName}> {item.name}</span>
    </div>
  );
}

DesktopItemGroup.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number
};
export default withStyles(styles)(DesktopItemGroup);
