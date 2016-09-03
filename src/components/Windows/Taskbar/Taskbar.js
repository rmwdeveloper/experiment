import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Taskbar.css'; //eslint-disable-line

import StartButton from '../StartButton';
import InfoHub from '../InfoHub';

class Taskbar extends Component {
  static propTypes = {
    toggleStartMenu: PropTypes.func
  };
  shouldComponentUpdate() {
    return false;
  }
  render() {
    const { toggleStartMenu } = this.props;
    return (
      <div className={styles.root}>
        <StartButton toggleStartMenu={toggleStartMenu} />
        <InfoHub />
      </div>
    );
  }
}

Taskbar.propTypes = {

};
export default withStyles(styles)(Taskbar);
