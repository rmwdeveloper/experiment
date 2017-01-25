import React, { PropTypes, Component } from 'react';
import styles from './DiskManager.css'; //eslint-disable-line
import withStyles from 'isomorphic-style-loader/lib/withStyles';

class DiskManager extends Component {
  static propTypes = {

  };
  constructor() {
    super();
  }
  render() {
    return <div className={styles.root}>
      {diskSpace} {usedSpace}
      <div className={styles.charts}>

      </div>
    </div>;
  }
}


export default withStyles(styles)(DiskManager);
