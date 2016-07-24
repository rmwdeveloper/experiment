import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './ModalButton.css'; //eslint-disable-line


class ModalButton extends Component {
  static propTypes = {
    clickFunction: PropTypes.func,
    text: PropTypes.string,
    closeModal: PropTypes.func
  };

  constructor() {
    super();
    this.click = this.click.bind(this);
  }

  click() {
    const { clickFunction, closeModal } = this.props;
    if (clickFunction) {
      clickFunction();
    }
    closeModal();
  }

  render() {
    const { text } = this.props;
    {
      return (
        <button onClick={this.click}>{text}</button>
      );
    }
  }

}
export default withStyles(styles)(ModalButton);
