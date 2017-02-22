import React, { Component, PropTypes } from 'react';
import emptyFunction from 'fbjs/lib/emptyFunction';
import styles from './App.css'; //eslint-disable-line
import { Provider } from 'react-redux';
import Navigation from '../Navigation';
import load from 'load-script';

export default class App extends Component {

  static propTypes = {
    context: PropTypes.shape({
      store: PropTypes.object.isRequired,
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
    const { insertCss } = this.props.context;
    this.removeCss = insertCss(styles);
  }
  componentDidMount() {
    load('scripts/jquery.min.js', (err, script) => {
      if (err) {
        console.log(err);
        // print useful message
      }
      else {
        load('scripts/bootstrap.min.js', (err, script) => {
          if (err) {
            // console.log(err);
            // print useful message
          }
          else {
            // console.log(script.src);// Prints 'foo'.js'
            // use script
            // note that in IE8 and below loading error wouldn't be reported
          }
        });
        load('scripts/summernote.min.js', (err, script) => {
          if (err) {
            // console.log(err);
            // print useful message
          }
          else {
            // console.log(script.src);// Prints 'foo'.js'
            // use script
            // note that in IE8 and below loading error wouldn't be reported
          }
        });
        // use script
        // note that in IE8 and below loading error wouldn't be reported
      }
    });
  }
  componentWillUnmount() {
    this.removeCss();
  }

  render() {
    if (this.props.error) {
      return this.props.children;
    }
    const store = this.props.context.store;
    return (
      <Provider store={store}>
        <div className={styles.root}>
          <Navigation />
          {this.props.children}
        </div>
      </Provider>
    );
  }
}

