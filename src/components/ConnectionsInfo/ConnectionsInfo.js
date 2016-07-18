import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './ConnectionsInfo.css'; //eslint-disable-line
import ConnectionTablet from '../ConnectionTablet/ConnectionTablet';

function ConnectionsInfo() {
  return (
    <div>
      <ConnectionTablet title="Feeds" amount={0} />
      <ConnectionTablet title="Followers" amount={0} />
      <ConnectionTablet title="Following" amount={1} />
      <ConnectionTablet title="Rank" amount={24} />
    </div>
  );
}

export default withStyles(styles)(ConnectionsInfo);
