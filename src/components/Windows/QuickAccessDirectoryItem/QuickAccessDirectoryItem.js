import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './QuickAccessDirectoryItem.css'; //eslint-disable-line
import cx from 'classnames';

function QuickAccessDirectoryItem({ data, className }) {
  return (
    <div className={styles.root}>
      <img className={styles.icon} src={data.icon} alt={`${data.name} icon`} />
      <span className={cx(styles.directoryName, className)}> {data.name}</span>
    </div>
  );
}

QuickAccessDirectoryItem.propTypes = {
  data: PropTypes.object,
  className: PropTypes.string
};
export default withStyles(styles)(QuickAccessDirectoryItem);
