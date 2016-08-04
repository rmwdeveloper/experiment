import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './WindowsContextMenu.css'; //eslint-disable-line
import cx from 'classnames';

function WindowsContextMenu({ contextMenuY, contextMenuX  }) {
  return (
    <ul style={{top: `${contextMenuY}px`, left: `${contextMenuX}px`}} className={cx(styles.root, styles.contextMenu)} type="context" id="mymenu">
      <li>
        <span className={styles.menuItem}>New <i className="fa fa-caret-right" /></span>
        <ul className={styles.nestedMenu}>
          <li><span className={styles.menuItem}>Folder</span></li>
          <li><span className={styles.menuItem}>Text Document</span></li>
          <li><span className={styles.menuItem}>Spreadsheet</span></li>
        </ul>
      </li>
      <li><span className={styles.menuItem}>Properties...</span></li>
    </ul>
  );
}

WindowsContextMenu.propTypes = {

};
export default withStyles(styles)(WindowsContextMenu);
