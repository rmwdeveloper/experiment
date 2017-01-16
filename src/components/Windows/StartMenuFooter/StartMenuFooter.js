import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './StartMenuFooter.css'; //eslint-disable-line
import fetch from '../../../core/fetch';
import logoutIcon from './xplogoffIcon.png';
import shutdownIcon from './xpShutdownButton.png';

class StartMenuFooter extends Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
  }
  async logout() {
    const response = await fetch('/logout', {
      method: 'get', credentials: 'include'
    });
    // if (response.status !== 200) throw new Error(response.statusText);
    // const data = await response.json();
  }
  render() {
    const { authenticator, openFile, closeStartMenu } = this.props;

    return (
      <div className={styles.root}>
        <div onClick={ () => {closeStartMenu(); openFile(authenticator.index)} } className={styles.footerButton}>
          <i className="fa fa-user fa-2x" />
          <span>Switch User</span>
        </div>
        <div onClick={this.logout} className={styles.footerButton}>
          <img src={logoutIcon} height="33" width="33" alt="Small key" />
          <span>Log Off</span>
        </div>
        <div className={styles.footerButton}>
          <img src={shutdownIcon} height="33" width="33" alt="Circle with vertical line in center" />
          <span>Turn Off Computer</span>
        </div>
      </div>
    );
  }
}

StartMenuFooter.propTypes = {

};
export default withStyles(styles)(StartMenuFooter);
// todo: convert footer buttons to actual button elements