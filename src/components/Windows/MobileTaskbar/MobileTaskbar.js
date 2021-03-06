import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import styles from './MobileTaskbar.css'; //eslint-disable-line

class MobileTaskbar extends Component {
  static propTypes = {
    toggleStartMenu: PropTypes.func,
    openedFiles: PropTypes.object,
    entities: PropTypes.object
  };

  render() {
    // const { toggleStartMenu, openedFiles, entities, clickMobileTaskbarItem } = this.props;
    return (
      <div className={styles.root}>
        <i className={cx("fa fa-cog", styles.startIcon)} />
      </div>
    );
  }
}


export default withStyles(styles)(MobileTaskbar);
