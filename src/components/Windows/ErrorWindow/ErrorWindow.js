import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './ErrorWindow.css'; //eslint-disable-line
import MoveableResizeableWindow from '../MoveableResizeableWindow';
import ErrorWindowTaskbar from '../ErrorWindowTaskbar';
// import cx from 'classnames';
// import { windowsClickables } from '../../../constants/windows';


function ErrorWindow({errorObject}) {
  console.log('errorObject', errorObject);
  return <div>ErrorWindow</div>;
  return (
    <MoveableResizeableWindow
      maximized={maximized}
      minimized={minimized}
      height={height}
      width={width} xPosition={xPosition} yPosition={yPosition} index={index}
    >
      <ErrorWindowTaskbar
        index={index}
        closeFile={closeFile}
      />
      {errorMessage}
    </MoveableResizeableWindow>);
}

ErrorWindow.propTypes = {

};
export default withStyles(styles)(ErrorWindow);
