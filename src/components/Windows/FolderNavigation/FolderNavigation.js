import React, { PropTypes } from 'react';
import styles from './FolderNavigation.css'; //eslint-disable-line
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';

function FolderNavigation() {

  return (
    <div className={styles.root}>
      <div className={styles.navigationButtons}>
        <i className={cx('fa fa-2x fa-arrow-circle-left', styles.navigationButton)} />
        <i className={cx('fa fa-2x fa-arrow-circle-right', styles.navigationButton)} />
      </div>
      <input className={styles.navigationInput} type="text"></input>
    </div>
  );
}

FolderNavigation.propTypes = {

};
export default withStyles(styles)(FolderNavigation);
