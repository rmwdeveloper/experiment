import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './TextDocument.css'; //eslint-disable-line


class TextDocument extends Component {
  constructor(props) {
    super();
  }
  render() {
    const { fileSystem, uniqueId, openedFiles } = this.props;
    return (<div className={styles.root}>
      <div>
        <h3 style={{textAlign: 'center'}}>Directions</h3>
        <ul>
          <li>

          </li>
        </ul>
        </div>
    </div>);
  }
}


export default withStyles(styles)(TextDocument);
