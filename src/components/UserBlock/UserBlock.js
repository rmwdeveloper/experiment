import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './UserBlock.css'; //eslint-disable-line
import cx from 'classnames';

function UserBlock() {
  console.log(arguments);
  return (
      <div>
        userblock
      </div>
  );
}

export default withStyles(styles)(UserBlock);
