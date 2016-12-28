import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './ContextMenu.css'; //eslint-disable-line
import cx from 'classnames';

class ContextMenu extends Component {
  static propTypes = {
    createFolder: PropTypes.func,
    contextMenuX: PropTypes.number,
    contextMenuY: PropTypes.number,
    contextMenuClickClass: PropTypes.string,
    contextMenuIndex: PropTypes.number,
  };
  constructor() {
    super();
    this.createFolder = this.createFolder.bind(this);
    this.notImplemented = this.notImplemented.bind(this);
  }
  createFolder(event) {
    event.stopPropagation();
    this.props.createFolder('desktopItems');
  }
  notImplemented() {
    console.log('open file iwndow');
  }
  render() {
    const { contextMenuX, contextMenuY, contextMenuClickClass, contextMenuIndexClicked } = this.props;
    console.log(contextMenuClickClass, contextMenuIndexClicked);
    return (
      <ul style={{top: `${contextMenuY}px`, left: `${contextMenuX}px`}} className={cx(styles.root, styles.contextMenu)}
          type="context" id="mymenu">
        {
          contextMenuClickClass === 'desktop' ?

            <li className={styles.nested}>
              <span className={styles.menuItem}>New <i className="fa fa-caret-right"/></span>
              <ul className={styles.nestedMenu}>
                <li onClick={this.createFolder}><span className={styles.menuItem}>Folder</span></li>
                <li><span className={styles.menuItem}>Text Document</span></li>
                <li><span className={styles.menuItem}>Spreadsheet</span></li>
              </ul>
            </li> : null
        }
        { contextMenuClickClass === 'desktop' ? <li onClick={this.notImplemented}><span className={styles.menuItem}>Properties...</span></li> : null}
      </ul>
    );
  }
}

export default withStyles(styles)(ContextMenu);
