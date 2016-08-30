import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './FileBaseTaskbar.css'; //eslint-disable-line
import cx from 'classnames';


export default function FileBaseTaskbar(ComposedComponent) {
  class FileBaseTaskbar extends Component {
    render() {
      const { closeFile, index, filename, toggleWindowMaximize, toggleWindowMinimize,
        openedFile: { maximized, height, width } } = this.props;
      return (
        <div>
          <div className={styles.root}>
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
        </div>
          <ComposedComponent {...this.state} {...this.props} />
        </div>);
    }
  }
  return withStyles(styles)(FileBaseTaskbar);
}

