import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './WindowsTaskbar.css'; //eslint-disable-line

import WindowsStartButton from '../WindowsStartButton';
import WindowsInfoHub from '../WindowsInfoHub';

class WindowsTaskbar extends Component {
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
        <WindowsStartButton toggleStartMenu={toggleStartMenu} />
        <WindowsInfoHub />
      </div>
    );
  }
}

WindowsTaskbar.propTypes = {

};
export default withStyles(styles)(WindowsTaskbar);
