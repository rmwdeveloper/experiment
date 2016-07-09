import React, { Component, PropTypes } from 'react';
import emptyFunction from 'fbjs/lib/emptyFunction';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './App.css';

export default class App extends Component {

   static propTypes = {
    context: PropTypes.shape({
      store: PropTypes.object,
      insertCss: PropTypes.func,
      setTitle: PropTypes.func,
      setMeta: PropTypes.func
    }).isRequired,
    children: PropTypes.element.isRequired,
    error: PropTypes.object
  };

  static childContextTypes = {
    insertCss: PropTypes.func.isRequired,
    setTitle: PropTypes.func.isRequired,
    setMeta: PropTypes.func.isRequired
  };

  getChildContext() {
    const context = this.props.context;
    return {
      insertCss: context.insertCss || emptyFunction,
      setTitle: context.setTitle || emptyFunction,
      setMeta: context.setMeta || emptyFunction
    };
  }

  componentWillMount() {
    const {insertCss} = this.props.context;
    this.removeCss = insertCss(styles);
  }

  componentWillUnmount() {
    this.removeCss();
  }

  render() {
    if (this.props.error) {
      return this.props.children;
    }
    return (
        <div>{this.props.children}</div>
    )
  }
}

export default App;