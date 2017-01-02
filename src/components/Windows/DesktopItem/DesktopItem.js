import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './DesktopItem.css'; //eslint-disable-line
import cx from 'classnames';
import { windowsClickables } from '../../../constants/windows';

function DesktopItem({ item, openFile, desktopWidth, desktopHeight, selected }) {
  const style = selected ? {backgroundColor: 'rgba(66,85,101,0.25)', outline: '2px solid rgb(115, 128, 140)'} : {};
  return (
    <div style={style} data-clickClass={windowsClickables.desktopItem} data-topClickable data-index={item.index} onDoubleClick={() => { openFile(item.index, desktopWidth, desktopHeight); }} className={cx('desktopIcon', styles.root)}>
      <img data-index={item.index} className={styles.icon} src={item.metadata.icon} alt={`${item.name} icon`} />
      <span data-clickClass={windowsClickables.desktopItemName} data-index={item.index} className={styles.directoryName}> {item.name}</span>
    </div>
  );
}

DesktopItem.propTypes = {
  item: PropTypes.object,
  openFile: PropTypes.func
};
export default withStyles(styles)(DesktopItem);
