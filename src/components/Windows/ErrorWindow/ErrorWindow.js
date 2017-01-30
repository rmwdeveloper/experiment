import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './ErrorWindow.css'; //eslint-disable-line
import MoveableResizeableWindow from '../MoveableResizeableWindow';
import ErrorWindowTaskbar from '../ErrorWindowTaskbar';
// import cx from 'classnames';
// import { windowsClickables } from '../../../constants/windows';


function ErrorWindow({errorObject, index, openedFile, closeErrorWindow, errorMessages}) {

  return (<div className={styles.root}>{errorMessages[openedFile.uniqueId]}</div>);
}

ErrorWindow.propTypes = {

};
export default withStyles(styles)(ErrorWindow);
