import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './FileBaseTaskbar.css'; //eslint-disable-line
import cx from 'classnames';
import { windowsClickables } from '../../../constants/windows';

function FileBaseTaskbar({filename, nodeIndex,
  toggleWindowMinimize, toggleWindowMaximize,
  uniqueId, closeFile, maximized}) {
  return (
    <div data-clickclass={windowsClickables.fileTaskbar} data-topClickable data-index={uniqueId} className={styles.root}>
      <span className={styles.fileName}>{filename}</span>
      <div className={styles.fileControls}>
        <i onClick={() => { toggleWindowMinimize(uniqueId); }} className={cx(styles.minimizeWindowIcon, 'fa fa-minus')} />
        <div onClick={() => { toggleWindowMaximize(uniqueId); }} className={styles.resizeWindowIcon}>
          <i className="fa fa-square-o" />
          {
            maximized ? <i className="fa fa-square-o" /> : null
          }
        </div>
        <i onClick={() => { closeFile(nodeIndex, uniqueId); }} className={cx(styles.closeWindowIcon, 'fa fa-remove')} />
      </div>
    </div>);
}

export default withStyles(styles)(FileBaseTaskbar);