import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './StartMenu.css'; //eslint-disable-line

import StartMenuHeader from '../StartMenuHeader';
import StartMenuBody from '../StartMenuBody';
import StartMenuFooter from '../StartMenuFooter';
class StartMenu extends Component {
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
        <StartMenuHeader />
        <StartMenuBody installedPrograms={installedPrograms} {...this.props} />
        <StartMenuFooter />
      </div>
    );
  }
}

StartMenu.propTypes = {

};
export default withStyles(styles)(StartMenu);
