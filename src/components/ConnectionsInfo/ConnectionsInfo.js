import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './ConnectionsInfo.css'; //eslint-disable-line
import ConnectionTablet from '../ConnectionTablet/ConnectionTablet';
import cx from 'classnames';

function ConnectionsInfo() {
  return (
    <div className={cx(styles.root, 'row')}>
      <ConnectionTablet className="col-lg-3 col-md-3 col-xs-3 col-sm-3" title="Feeds" amount={0} />
      <ConnectionTablet
        className="col-lg-3 col-md-3 col-xs-3 col-sm-3" title="Followers" amount={0}
      />
      <ConnectionTablet
        className="col-lg-3 col-md-3 col-xs-3 col-sm-3" title="Following" amount={1}
      />
      <ConnectionTablet className="col-lg-3 col-md-3 col-xs-3 col-sm-3" title="Rank" amount={24} />
    </div>
  );
}

export default withStyles(styles)(ConnectionsInfo);
