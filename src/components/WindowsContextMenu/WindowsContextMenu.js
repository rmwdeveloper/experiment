import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './WindowsContextMenu.css'; //eslint-disable-line
import cx from 'classnames';

class WindowsContextMenu extends Component {
  constructor() {
    super();
    this.createFolder = this.createFolder.bind(this);
  }
  createFolder(event) {
    event.stopPropagation();
    this.props.createFolder('desktopItems');
  }
  render() {
    const { contextMenuX, contextMenuY, createFolder } = this.props;
    return (
      <ul style={{top: `${contextMenuY}px`, left: `${contextMenuX}px`}} className={cx(styles.root, styles.contextMenu)}
          type="context" id="mymenu">
        <li className={styles.nested}>
          <span className={styles.menuItem}>New <i className="fa fa-caret-right"/></span>
          <ul className={styles.nestedMenu}>
            <li onMouseDown={this.createFolder}><span className={styles.menuItem}>Folder</span></li>
            <li><span className={styles.menuItem}>Text Document</span></li>
            <li><span className={styles.menuItem}>Spreadsheet</span></li>
          </ul>
        </li>
        <li><span className={styles.menuItem}>Properties...</span></li>
      </ul>
    );
  }
}
WindowsContextMenu.propTypes = {

};
export default withStyles(styles)(WindowsContextMenu);
