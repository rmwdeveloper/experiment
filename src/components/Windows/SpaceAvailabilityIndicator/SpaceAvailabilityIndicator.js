import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './SpaceAvailabilityIndicator.css'; //eslint-disable-line
import cx from 'classnames';

function SpaceAvailabilityIndicator({ usedSpace, diskSpace }) {
  const gaugeStyle = {background: `linear-gradient(145deg, red ${usedSpace / diskSpace * 100}%, rgba(0,0,0,0) ${usedSpace / diskSpace * 100}%)`};
  return <div className={styles.root}>
    <div style={gaugeStyle} className={styles.availabilityGauge}></div>
    <span className={cx(styles.caption, styles.used)}>Used</span> <span className={cx(styles.caption, styles.available)}>Available</span>
  </div>;
}

SpaceAvailabilityIndicator.propTypes = {

};

export default withStyles(styles)(SpaceAvailabilityIndicator);

