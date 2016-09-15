import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './FileBaseTaskbar.css'; //eslint-disable-line
import cx from 'classnames';
import { windowsClickables } from '../../../constants/windows';

function FileBaseTaskbar({filename,
  toggleWindowMinimize, toggleWindowMaximize,
  index, closeFile, maximized}) {
  return (
    <div data-clickclass={windowsClickables.fileTaskbar} data-index={index} className={styles.root}>
      <span className={styles.fileName}>{filename}</span>
      <div className={styles.fileControls}>
        <i onClick={() => { toggleWindowMinimize(index); }} className={cx(styles.minimizeWindowIcon, 'fa fa-minus')} />
        <div onClick={() => { toggleWindowMaximize(index); }} className={styles.resizeWindowIcon}>
          <i  className="fa fa-square-o" />
          {
            maximized ? <i className="fa fa-square-o" /> : null
          }
        </div>
        <i onClick={() => { closeFile(index); }} className={cx(styles.closeWindowIcon, 'fa fa-remove')} />
      </div>
    </div>);
}

export default withStyles(styles)(FileBaseTaskbar);