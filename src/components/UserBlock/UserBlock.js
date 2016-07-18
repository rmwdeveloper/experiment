import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './UserBlock.css'; //eslint-disable-line
import cx from 'classnames';

import PersonalInfo from '../PersonalInfo/PersonalInfo';
import ConnectionsInfo from '../ConnectionsInfo/ConnectionsInfo';

function UserBlock({first, last, handle}) {
  console.log(first, last, handle);
  return (
    <div className={cx(styles.root, 'row')}>
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <PersonalInfo />
        <ConnectionsInfo />
      </div>
    </div>
  );
}

export default withStyles(styles)(UserBlock);
