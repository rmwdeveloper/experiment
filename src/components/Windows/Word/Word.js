import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Word.css'; //eslint-disable-line
import {Editor, EditorState} from 'draft-js';

class Word extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };
    this.onChange = (editorState) => this.setState({editorState});
  }
  render() {
    const { editorState } = this.state;
    return <Editor editorState={editorState} onChange={this.onChange} />;
  }
}


export default withStyles(styles)(Word);
