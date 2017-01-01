import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './ErrorWindowTaskbar.css'; //eslint-disable-line
import cx from 'classnames';
import { windowsClickables } from '../../../constants/windows';

function ErrorWindowTaskbar({index, closeFile}) {
  return (
    <div data-clickclass={windowsClickables.errorTaskbar} data-topClickable data-index={index} className={styles.root}>
      <span className={styles.fileName}>Error - Not Implemented</span>
      <div className={styles.fileControls}>
        <i onClick={() => { closeFile(index); }} className={cx(styles.closeWindowIcon, 'fa fa-remove')} />
      </div>
    </div>);
}

export default withStyles(styles)(ErrorWindowTaskbar);