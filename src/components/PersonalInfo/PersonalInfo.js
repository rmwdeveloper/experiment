import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './PersonalInfo.css'; //eslint-disable-line
import cx from 'classnames';

function PersonalInfo({first, last, handle}) {
  return (
    <div>
      personal
    </div>
  );
}

export default withStyles(styles)(PersonalInfo);
