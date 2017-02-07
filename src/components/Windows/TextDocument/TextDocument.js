import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './TextDocument.css'; //eslint-disable-line


class TextDocument extends Component {
  constructor(props) {
    super();
  }
  render() {
    return (<div className={styles.root}>
      <ul style={{padding: '20px'}}>
        <li>Add order attribute to FileNodes. Allow reordering/sorting by date, name, size.</li>
        <li> Add cancel / pause functionality for uploads.</li>
        <li> Convert Folder from function to Component</li>
        <li> Pack dropzone script with webpack. </li>
        <li>Refactor duplicate dragWindow functionality found in both desktop and foldercontents</li>
        <li> Refactor components/authenticator bulky render method.</li>
        <li> Replace some authenticator functionality with a premade auth package. Also find a good node/react forms package. </li>
        <li> Refactor some redux actions with redux-thunk to handle different XHR states (loading / complete / error). </li>
        <li> Abstract headers away for some fetch calls (handle JSON) </li>
        <li> Abstract headers away for some fetch calls found in windows and auth actions (handle JSON) </li>
        <li> Abstract headers away for some fetch calls found in windows and auth actions (handle JSON) </li>
      </ul>
    </div>);
  }
}


export default withStyles(styles)(TextDocument);
