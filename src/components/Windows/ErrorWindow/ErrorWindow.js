import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './ErrorWindow.css'; //eslint-disable-line
// import cx from 'classnames';
// import { windowsClickables } from '../../../constants/windows';


function ErrorWindow({ item, openFile, desktopWidth, desktopHeight }) {
  return (
    <div>
      Error Window
    </div>
  );
}

ErrorWindow.propTypes = {

};
export default withStyles(styles)(ErrorWindow);
