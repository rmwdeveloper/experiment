import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './WindowsFileBaseTaskBar.css'; //eslint-disable-line
import cx from 'classnames';


export default function WindowsFileBaseTaskbar(ComposedComponent) {
  class WindowsFileBaseTaskBar extends Component {
    render() {
      return (
        <div>
          <div className={styles.root}>
          <span className={styles.fileName}> Folder Name!</span>
          <div className={styles.fileControls}>
            <i className={cx(styles.minimizeWindowIcon, 'fa fa-minus')} />
            <div className={styles.resizeWindowIcon}>
              <i className="fa fa-square-o" />
              <i className="fa fa-square-o" />
            </div>
            <i className={cx(styles.closeWindowIcon, 'fa fa-remove')} />
          </div>
        </div>
          <ComposedComponent {...this.state} {...this.props} />
        </div>);
    }
  }
  return withStyles(styles)(WindowsFileBaseTaskBar);
}
