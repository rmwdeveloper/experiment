import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Word.css'; //eslint-disable-line

class Word extends Component {
  static propTypes = {
  };
  render() {
    return (
      <div className={styles.root}> Word </div>
    );
  }
}


export default withStyles(styles)(Word);
