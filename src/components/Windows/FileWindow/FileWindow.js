import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './FileWindow.css'; //eslint-disable-line
import FileBaseTaskbar from '../FileBaseTaskbar';
import MoveableResizeableWindow from '../MoveableResizeableWindow';

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
      const { index, filename, closeFile, toggleWindowMaximize, toggleWindowMinimize,
        openedFile: { maximized, minimized, height, width, xPosition, yPosition } } = this.props;

      return (
        <MoveableResizeableWindow
          maximized={maximized}
          minimized={minimized}
          height={height}
          width={width} xPosition={xPosition} yPosition={yPosition} index={index} >
          <FileBaseTaskbar
            toggleWindowMaximize={toggleWindowMaximize}
            toggleWindowMinimize={toggleWindowMinimize}
            index={index}
            maximized={maximized}
            filename={filename}
            closeFile={closeFile}
          />
          <ComposedComponent {...this.state} {...this.props} />
        </MoveableResizeableWindow>);
    }
  }
  return withStyles(styles)(FileWindow);
}

