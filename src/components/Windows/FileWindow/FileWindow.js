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
        openedFile: { maximized, minimized, height, width, xPosition, yPosition } } = this.props;

      let windowStyle = {height, width, left: xPosition, top: yPosition};

      if (maximized) {
        windowStyle = {height: '100%', width: '100%', left: 0, top: 0};
      }
      if (minimized) {
        windowStyle = {height: 0, width: 0, left: 0, top: 0};
      }
      return (
        <div className={styles.root} style={windowStyle}>
          <FileBaseTaskbar
            maximized={maximized}
            minimized={minimized}
            toggleWindowMaximize={toggleWindowMaximize}
            toggleWindowMinimize={toggleWindowMinimize}
            index={index}
            filename={filename}
            closeFile={closeFile}
          />
          <ComposedComponent {...this.state} {...this.props} />
          <div data-clickClass={windowsClickables.fileResizeHandle} data-index={index} className={styles.bottomRightResizer}></div>
        </div>);
    }
  }
  return withStyles(styles)(FileWindow);
}

