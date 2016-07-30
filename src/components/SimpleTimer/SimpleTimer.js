import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './SimpleTimer.css'; //eslint-disable-line


class SimpleTimer extends Component {

  constructor() {
    super();
    this.checkTime = this.checkTime.bind(this);
    this.timer = this.timer.bind(this);
  }
  componentWillMount() {
    this.timeInterval = setTimeout(this.timer, 1000);
  }
  timer() {
    const today = new Date();
    const hours = today.getHours();
    const minutes = today.getMinutes();
    const checkedMinutes = this.checkTime(minutes);
    const node = document.getElementById('timer');
    node.innerHTML = `${hours}:${minutes}`;
  }
  checkTime(digit) {
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
