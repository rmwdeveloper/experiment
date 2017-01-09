import React, { PropTypes, Component } from 'react';
import styles from './Authenticator.css'; //eslint-disable-line
import withStyles from 'isomorphic-style-loader/lib/withStyles';


class Authenticator extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    const form = document.getElementById(styles.registrationForm);
    const data = new FormData(form);
    console.log( form, data);
    for ( let key of data.keys()) {
      console.log(key);
    }
  }
  render() {
    const { registering, toggleRegisterMode } = this.props;
    const mode = registering ? 'Register' : 'Login';

    return <div className={styles.root}>
      <form id={styles.registrationForm} onSubmit={this.handleSubmit}>
        <div className={styles.controlGroup}>
          <label htmlFor={styles.registerEmail}>Email</label>
          <input type="email" id={styles.registerEmail} />
        </div>
        {
           registering ?
             <div className={styles.controlGroup}>
              <label htmlFor={styles.registerUsername}>Username</label>
              <input type="text" id={styles.registerUsername} />
            </div> : null
        }
        <div className={styles.controlGroup}>
          <label htmlFor={styles.registerPassword}>Password</label>
          <input type="password" id={styles.registerPassword} />
        </div>
        <button id={styles.submitButton} type="submit">{mode}</button>
        <span className={styles.toggleMode} onClick={toggleRegisterMode}>Don't have an account? Click here to register. </span>
      </form>
    </div>;
  }
}

export default withStyles(styles)(Authenticator);
