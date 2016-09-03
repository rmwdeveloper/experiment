import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './StartMenuHeader.css'; //eslint-disable-line

import userImage from './userImage.jpg';
class StartMenuHeader extends Component {

  render() {
    return (
      <div className={styles.root}>
        <img className={styles.userImage} src={userImage} height="256" width="256" alt="default user " />
        <span className={styles.username} >John Doe</span>
      </div>
    );
  }
}

StartMenuHeader.propTypes = {

};
export default withStyles(styles)(StartMenuHeader);
