import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './SimpleTimer.css'; //eslint-disable-line


class SimpleTimer extends Component {

  constructor() {
    super();
    this.formatMinutes = this.formatMinutes.bind(this);
    this.formatHours = this.formatHours.bind(this);
    this.timer = this.timer.bind(this);
  }
  componentWillMount() {
    this.timeInterval = setTimeout(this.timer, 1000);
  }
  componentWillUnmount() {
    if (window) {
      window.clearInterval(this.timeInterval);
    }
  }
  timer() {
    const today = new Date();
    const hours = today.getHours();
    const minutes = today.getMinutes();
    console.log(hours, minutes);
    const AMPM = hours >= 12 ? 'PM' : 'AM';
    const formattedMinutes = this.formatMinutes(minutes, 'minutes');
    const formattedHours = this.formatHours(hours, 'hours');

    if (typeof document !== 'undefined') {
      const node = document.getElementById('timer');
      node.innerHTML = `${formattedHours}:${formattedMinutes} ${AMPM}`;
    }
  }
  formatMinutes(digit) {
    if (digit < 10) {
      digit = `0${digit}`;
    }
    return digit;
  }
  formatHours(digit) {
    if (digit < 12) {
      digit = `${digit}`;
    } else if (digit > 12 && interval === 'hours' ) {
      digit = Math.abs(12 - digit);
    }
    return digit;
  }
  render() {
    return (
      <span id="timer" className={styles.root}> </span>
    );
  }
}

SimpleTimer.propTypes = {

};
export default withStyles(styles)(SimpleTimer);
