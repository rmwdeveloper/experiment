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
      openedFile: PropTypes.object
    };
    render() {
      const { index, filename, closeFile, toggleWindowMaximize, toggleWindowMinimize,
        openedFile, openedFileDimensions, uniqueId } = this.props;
      // todo: make sure FileBaseTaskbar min/max button reflects minimization maximization state
      const dimensions = openedFileDimensions[uniqueId];
      return (
        <MoveableResizeableWindow uniqueId={uniqueId} dimensions={dimensions} >
          <FileBaseTaskbar
            toggleWindowMaximize={toggleWindowMaximize}
            toggleWindowMinimize={toggleWindowMinimize}
            uniqueId={uniqueId}
            filename={filename}
            closeFile={closeFile}
          />
          <ComposedComponent {...this.state} {...this.props} />
        </MoveableResizeableWindow>);
    }
  }
  return FileWindow
}

