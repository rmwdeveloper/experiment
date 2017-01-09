import React, { PropTypes, Component } from 'react';
import styles from './Authenticator.css'; //eslint-disable-line
import withStyles from 'isomorphic-style-loader/lib/withStyles';


class Authenticator extends Component {
  constructor() {
    super();
    this.state = {
      mode: 'login'
    }
  }
  render() {
    const { mode } = this.state;
    return <div className={styles.root}>
      <form onSubmit={this.handleSubmit}>
        <div className={styles.controlGroup}>
          <label for={styles.registerEmail}>Email</label>
          <input type="email" id={styles.registerEmail} />
        </div>
        {
          mode === 'register' ?
             <div className={styles.controlGroup}>
              <label for={styles.registerUsername}>Username</label>
              <input type="text" id={styles.registerUsername} />
            </div> : null
        }
        <div className={styles.controlGroup}>
          <label for={styles.registerPassword}>Password</label>
          <input type="password" id={styles.registerPassword} />
        </div>
        <input type="submit" value="Submit" />
      </form>
    </div>;
  }
}

export default withStyles(styles)(Authenticator);
