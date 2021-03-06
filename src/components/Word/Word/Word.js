import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Word.css'; //eslint-disable-line
import { Editor, EditorState, RichUtils } from 'draft-js';
import WordTaskbar from '../WordTaskbar/WordTaskbar';


class Word extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };
    this.onChange = (editorState) => this.setState({ editorState });
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    // this.onFormatClick = this.onFormatClick.bind(this);
  }
  handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
  }
  render() {
    const { editorState } = this.state;
    return (<div className={styles.root}>
      <WordTaskbar boldClick={this.onFormatClick} />
      <Editor handleKeyCommand={this.handleKeyCommand} editorState={editorState} onChange={this.onChange} />
    </div>);
  }
}


export default withStyles(styles)(Word);
