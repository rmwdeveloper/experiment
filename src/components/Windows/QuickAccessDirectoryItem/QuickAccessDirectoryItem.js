import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './QuickAccessDirectoryItem.css'; //eslint-disable-line
import cx from 'classnames';

function QuickAccessDirectoryItem({ data, className }) {
  const style = {background: `url(${data.metadata.icon})`};
  if (data.metadata.sprite) {
    style.backgroundSize = '425px';
    style.backgroundPosition = data.metadata.backgroundPosition;
  }
  return (
    <div className={styles.root}>
      <div style={style} data-index={data.index} className={cx(styles.icon)}></div>
      <span className={cx(styles.directoryName, className)}> {data.name}</span>
    </div>
  );
}

QuickAccessDirectoryItem.propTypes = {
  data: PropTypes.object,
  className: PropTypes.string
};
export default withStyles(styles)(QuickAccessDirectoryItem);
