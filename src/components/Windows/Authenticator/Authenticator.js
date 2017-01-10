import React, { PropTypes, Component } from 'react';
import styles from './Authenticator.css'; //eslint-disable-line
import withStyles from 'isomorphic-style-loader/lib/withStyles';


function registerCallback(event) { // todo: Move somewhere lse.
  const response = event.target;
  if(response.readyState == XMLHttpRequest.DONE) {
    if (response.status === 200) {
      console.log('success');
    } else {
      const errors = JSON.parse(response.response);

    }
  }
}
class Authenticator extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    const form = document.getElementById(styles.registrationForm);
    const data = new FormData(form);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/register', true);
    xhr.onreadystatechange = registerCallback;
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({ email: data.get('email'), username: data.get('username'), password: data.get('password') }));
  }
  render() {
    const { registering } = this.props;
    const mode = registering ? 'Register' : 'Login';
    return <div className={styles.root}>
      <form id={styles.registrationForm} onSubmit={this.handleSubmit}>
        <div className={styles.controlGroup}>
          <label htmlFor={styles.registerEmail}>Email</label>
          <input name="email" type="email" id={styles.registerEmail} />
        </div>
        {
           registering ?
             <div className={styles.controlGroup}>
              <label htmlFor={styles.registerUsername}>Username</label>
              <input name="username" type="text" id={styles.registerUsername} />
            </div> : null
        }
        <div className={styles.controlGroup}>
          <label htmlFor={styles.registerPassword}>Password</label>
          <input name="password" type="password" id={styles.registerPassword} />
        </div>
        <button id={styles.submitButton} type="submit">{mode}</button>
        <span className={styles.toggleMode}>Don't have an account? Click here to register. </span>
      </form>
    </div>;
  }
}

export default withStyles(styles)(Authenticator);
