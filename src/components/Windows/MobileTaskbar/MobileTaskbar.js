import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './MobileTaskbar.css'; //eslint-disable-line

class MobileTaskbar extends Component {
  static propTypes = {
    toggleStartMenu: PropTypes.func,
    openedFiles: PropTypes.array,
    entities: PropTypes.object
  };

  render() {
    // const { toggleStartMenu, openedFiles, entities, clickMobileTaskbarItem } = this.props;
    return (
      <div className={styles.root}>
        
      </div>
    );
  }
}


export default withStyles(styles)(MobileTaskbar);
