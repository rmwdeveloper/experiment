import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './ErrorWindow.css'; //eslint-disable-line
import MoveableResizeableWindow from '../MoveableResizeableWindow';
import ErrorWindowTaskbar from '../ErrorWindowTaskbar';
// import cx from 'classnames';
// import { windowsClickables } from '../../../constants/windows';


function ErrorWindow({errorObject, index, closeErrorWindow}) {
  const { errorMessage, xPosition, yPosition, width, height } = errorObject;
  return (
    <MoveableResizeableWindow
      height={height}
      width={width} xPosition={xPosition} yPosition={yPosition} index={index}
    >
      <ErrorWindowTaskbar
        index={index}
        closeFile={closeErrorWindow}
      />
      <div className={styles.root}>
        {errorMessage}
      </div>
    </MoveableResizeableWindow>);
}

ErrorWindow.propTypes = {

};
export default withStyles(styles)(ErrorWindow);
