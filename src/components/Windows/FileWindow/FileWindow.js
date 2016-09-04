import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './FileWindow.css'; //eslint-disable-line
import FileBaseTaskbar from '../FileBaseTaskbar';
import { windowsClickables } from '../../../constants/windows';

export default function FileWindow(ComposedComponent) {
  class FileWindow extends Component {
    static propTypes = {
      closeFile: PropTypes.func,
      index: PropTypes.number,
      toggleWindowMaximize: PropTypes.func,
      toggleWindowMinimize: PropTypes.func,
      filename: PropTypes.string,
      openedFile: PropTypes.object
    };
    render() {
      const { closeFile, index, filename, toggleWindowMaximize, toggleWindowMinimize,
        openedFile: { maximized, height, width } } = this.props;
      return (
        <div className={styles.root} style={{height, width}}>
          <FileBaseTaskbar
            maximized={maximized}
            toggleWindowMaximize={toggleWindowMaximize}
            toggleWindowMinimize={toggleWindowMinimize}
            index={index}
            filename={filename}
            closeFile={closeFile}
          />
          <ComposedComponent {...this.state} {...this.props} />
        </div>);
    }
  }
  return withStyles(styles)(FileWindow);
}

