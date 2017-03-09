import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './TextDocument.css'; //eslint-disable-line
import { connect } from 'react-redux';
// Todo: Replace dangerouslysetinnerhtml with a safe method. This is not a priority at the moment, because
// there is no user submitted HTML strings.

@connect(state => ({
  textDocumentMarkup: state.windows.textDocumentMarkup
}), { })
class TextDocument extends Component {
  constructor(props) {
    super();
    this.renderTextMarkup = this.renderTextMarkup.bind(this);
  }
  renderTextMarkup() {
    const { openedFile: {index}, textDocumentMarkup } = this.props;

    return {__html: textDocumentMarkup[index].markup};
  }
  render() {
    return (<div className={styles.root}>
        <div dangerouslySetInnerHTML={this.renderTextMarkup()} />
    </div>);
  }
}


export default withStyles(styles)(TextDocument);
