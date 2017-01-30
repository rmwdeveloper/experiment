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
        openedFile, openedFileDimensions } = this.props;
      // todo: make sure FileBaseTaskbar min/max button reflects minimization maximization state
      const dimensions = openedFileDimensions[openedFile.nodeIndex][openedFile.uniqueId];
      return (
        <MoveableResizeableWindow uniqueId={openedFile.uniqueId} nodeIndex={openedFile.nodeIndex} dimensions={dimensions} >
          <FileBaseTaskbar
            toggleWindowMaximize={toggleWindowMaximize}
            toggleWindowMinimize={toggleWindowMinimize}
            uniqueId={openedFile.uniqueId}
            nodeIndex={openedFile.nodeIndex}
            filename={filename}
            closeFile={closeFile}
          />
          <ComposedComponent {...this.state} {...this.props} />
        </MoveableResizeableWindow>);
    }
  }
  return FileWindow
}

