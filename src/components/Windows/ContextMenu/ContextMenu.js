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
    contextMenuIndex: PropTypes.string,
    openErrorWindow: PropTypes.func
  };
  constructor() {
    super();
    this.createFolder = this.createFolder.bind(this);
    this.notImplemented = this.notImplemented.bind(this);
  }
  createFolder(event) {
    event.stopPropagation();
    this.props.createFolder(this.props.contextMenuClickClass, this.props.contextMenuIndexClicked);
  }

  notImplemented() {
    this.props.openErrorWindow("This isn't implemented yet. Sorry!");
  }
  render() {
    const { contextMenuX, contextMenuY, contextMenuClickClass, contextMenuIndexClicked, deleteFiles } = this.props;
    // todo: refactor render
    return (
      <ul style={{top: `${contextMenuY}px`, left: `${contextMenuX}px`}} className={cx(styles.root, styles.contextMenu)}
          type="context" id="mymenu">
        {
          contextMenuClickClass === 'desktop' ?

            <li className={styles.nested}>
              <span className={styles.menuItem}>New <i className="fa fa-caret-right"/></span>
              <ul className={styles.nestedMenu}>
                <li onClick={this.createFolder}><span className={styles.menuItem}>Folder</span></li>
                <li onClick={this.notImplemented}><span className={styles.menuItem}>Text Document</span></li>
                <li onClick={this.notImplemented}><span className={styles.menuItem}>Spreadsheet</span></li>
              </ul>
            </li> : null
        }
        { contextMenuClickClass === 'desktopItem' || 'folderItem' ? <li onClick={this.notImplemented}><span className={styles.menuItem}>Open</span></li> : null}
        { contextMenuClickClass === 'desktopItem' || 'folderItem' ? <li onClick={this.notImplemented}><span className={styles.menuItem}>Download Contents</span></li> : null}
        { contextMenuClickClass === 'desktopItem' || 'folderItem' ? <li onClick={() => { deleteFiles(contextMenuIndexClicked, contextMenuClickClass); }}><span className={styles.menuItem}>Delete</span></li> : null}
        { contextMenuClickClass === 'desktopItem' || 'folderItem' ? <li onClick={this.notImplemented}><span className={styles.menuItem}>Rename</span></li> : null}
      </ul>
    );
  }
}

export default withStyles(styles)(ContextMenu);
