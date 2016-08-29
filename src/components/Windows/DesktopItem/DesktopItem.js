import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './DesktopItem.css'; //eslint-disable-line
import cx from 'classnames';

function DesktopItem({ item, openFile }) {
  return (
    <div data-index={item.index} onDoubleClick={() => { openFile(item.index); }} className={cx('desktopIcon', styles.root)}>
      <img className={styles.icon} src={item.icon} alt={`${item.name} icon`} />
      <span className={styles.directoryName}> {item.name}</span>
    </div>
  );
}

DesktopItem.propTypes = {
  item: PropTypes.object,
  openFile: PropTypes.func
};
export default withStyles(styles)(DesktopItem);
