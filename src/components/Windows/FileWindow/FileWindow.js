import React, { Component, PropTypes } from 'react';
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
      openedFile: PropTypes.number
    };
    render() {
      const { index, filename, closeFile, toggleWindowMaximize, toggleWindowMinimize,
        openedFile, openedFileDimensions } = this.props;
      // todo: make sure FileBaseTaskbar min/max button reflects minimization maximization state
      return (
        <MoveableResizeableWindow index={index} dimensions={openedFileDimensions[openedFile]} >
          <FileBaseTaskbar
            toggleWindowMaximize={toggleWindowMaximize}
            toggleWindowMinimize={toggleWindowMinimize}
            index={index}
            filename={filename}
            closeFile={closeFile}
          />
          <ComposedComponent {...this.state} {...this.props} />
        </MoveableResizeableWindow>);
    }
  }
  return FileWindow
}

