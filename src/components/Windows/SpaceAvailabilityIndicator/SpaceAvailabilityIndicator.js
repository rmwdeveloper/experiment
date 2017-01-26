import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './SpaceAvailabilityIndicator.css'; //eslint-disable-line
import cx from 'classnames';

function getColor(value) {
  const hue=((1-value)*120).toString(10);
  return ["hsl(",hue,",100%,50%)"].join("");
}

function SpaceAvailabilityIndicator({ usedSpace, diskSpace }) {
  const percentUsed = usedSpace / diskSpace * 100;
  const color = getColor(usedSpace / diskSpace);
  const angle = percentUsed < 10 ? 90 : 145;
  const gaugeStyle = {background: `linear-gradient(${angle}deg, ${color} ${percentUsed}%, rgba(0,0,0,0) ${percentUsed}%)`};
  return <div className={styles.root}>
    <div style={gaugeStyle} className={styles.availabilityGauge}></div>
    <span className={cx(styles.caption, styles.used)}>Used</span> <span className={cx(styles.caption, styles.available)}>Available</span>
  </div>;
}

SpaceAvailabilityIndicator.propTypes = {

};

export default withStyles(styles)(SpaceAvailabilityIndicator);

