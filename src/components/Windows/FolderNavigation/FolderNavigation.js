import React, { PropTypes } from 'react';
import styles from './FolderNavigation.css'; //eslint-disable-line
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';

function FolderNavigation() {

  return (
    <div className={styles.root}>
      <i className={cx('fa fa-2x fa-arrow-circle-left')} />
      <i className={cx('fa fa-2x fa-arrow-circle-right')} />
      <input type="text"></input>
    </div>
  );
}

FolderNavigation.propTypes = {

};
export default withStyles(styles)(FolderNavigation);
