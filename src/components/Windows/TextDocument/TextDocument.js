import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './TextDocument.css'; //eslint-disable-line


class TextDocument extends Component {
  constructor(props) {
    super();
  }
  render() {
    return (<div className={styles.root}>
      Text Document
    </div>);
  }
}


export default withStyles(styles)(TextDocument);
