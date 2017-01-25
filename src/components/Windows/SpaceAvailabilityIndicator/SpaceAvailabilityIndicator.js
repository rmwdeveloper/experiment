import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './SpaceAvailabilityIndicator.css'; //eslint-disable-line


function SpaceAvailabilityIndicator({ item, openFile, connectDragSource, connectDropTarget, className }) {
  return <div>Space Availability Indicator</div>
}

SpaceAvailabilityIndicator.propTypes = {

};

export default withStyles(styles)(SpaceAvailabilityIndicator);

