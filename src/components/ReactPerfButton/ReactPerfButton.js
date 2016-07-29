import React, { Component, className, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './ReactPerfButton.css'; //eslint-disable-line
import Perf from 'react-addons-perf';
import cx from 'classnames';

class ReactPerfButton extends Component {
  static propTypes = {
    className: PropTypes.string
  };
  constructor() {
    super();
    this.startPerf = this.startPerf.bind(this);
    this.stopPerf = this.stopPerf.bind(this);
    this.state = {
      recording: false
    };
  }
  startPerf() {
    this.setState({recording: true});
    Perf.start();

  }
  stopPerf() {
    this.setState({recording: false});
    Perf.stop();
    Perf.printWasted();
  }
  render() {
    const {className} = this.props;
    const { recording } = this.state;
    return (
      <div className={cx(className, styles.root)}>
        {recording ?
          <span onClick={this.stopPerf} >Stop Recording</span>
          :
          <span onClick={this.startPerf} >Start Recording</span>
        }
      </div>
    );
  }
}

export default withStyles(styles)(ReactPerfButton);
