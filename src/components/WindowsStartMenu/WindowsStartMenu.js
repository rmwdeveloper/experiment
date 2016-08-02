import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './WindowsStartMenu.css'; //eslint-disable-line

import WindowsStartMenuHeader from '../WindowsStartMenuHeader';
import WindowsStartMenuBody from '../WindowsStartMenuBody';
import WindowsStartMenuFooter from '../WindowsStartMenuFooter';
class WindowsStartMenu extends Component {
  static propTypes = {
    installedPrograms: PropTypes.object
  };
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { installedPrograms } = this.props;
    return (
      <div className={styles.root}>
        <WindowsStartMenuHeader />
        <WindowsStartMenuBody installedPrograms={installedPrograms} {...this.props} />
        <WindowsStartMenuFooter />
      </div>
    );
  }
}

WindowsStartMenu.propTypes = {

};
export default withStyles(styles)(WindowsStartMenu);
