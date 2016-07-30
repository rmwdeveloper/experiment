import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './SimpleTimer.css'; //eslint-disable-line


class SimpleTimer extends Component {

  constructor() {
    super();
    this.formatTime = this.formatTime.bind(this);
    this.timer = this.timer.bind(this);
  }
  componentWillMount() {
    this.timeInterval = setTimeout(this.timer, 1000);
  }
  timer() {
    const today = new Date();
    const hours = today.getHours();
    const minutes = today.getMinutes();
    const AMPM = hours >= 12 ? 'PM' : 'AM';
    const formattedMinutes = this.formatTime(minutes);
    const formattedHours = this.formatTime(hours);

    const node = document.getElementById('timer');
    node.innerHTML = `${formattedHours}:${formattedMinutes} ${AMPM}`;
  }
  formatTime(digit) {
    if (digit < 10) {digit = `0${digit}`;}
    return digit;
  }
  render() {
    return (
      <span id="timer" className={styles.root}>12:00 PM</span>
    );
  }
}

SimpleTimer.propTypes = {

};
export default withStyles(styles)(SimpleTimer);
