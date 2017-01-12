import React, { PropTypes, Component } from 'react';
import styles from './Authenticator.css'; //eslint-disable-line
import withStyles from 'isomorphic-style-loader/lib/withStyles';


// todo rmw: Abstract away some of the more generic form functionality. Like, POST'ing it to the server, and updating
// form status. I couldn't find any good generic react form elements.
class Authenticator extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.registrationCallback = this.registrationCallback.bind(this);
    this.loginCallback = this.loginCallback.bind(this);
    this.state = {
      errors: []
    }
  }
  loginCallback(event) {
    const response = event.target;
    if(response.readyState == XMLHttpRequest.DONE) {
      if (response.status === 200) {
        console.log('Logged in!');
      } else {
        console.log('Login Failure');
      }
    }
  }
  registrationCallback() {
    const response = event.target;
    if(response.readyState == XMLHttpRequest.DONE) {
      if (response.status === 200) {
        this.setState({errors: []});
      } else {
        const errors = JSON.parse(response.response);
        this.setState({errors});
      }
    }
  }
  handleSubmit(event) {
    event.preventDefault();
    const mode = this.props.registering ? 'register' : 'login';
    const form = document.getElementById(styles.registrationForm);
    const data = new FormData(form);
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = this.props.registering ? this.registrationCallback : this.loginCallback;
    xhr.open('POST', `/${mode}`, true);
    xhr.timeout = 1000;
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({ email: data.get('email'), username: data.get('username'), password: data.get('password') }));
  }
  render() {
    const { registering, toggleRegisterMode } = this.props; // todo: refactor this bulky render.
    const { errors } = this.state;
    const usernameErrors = errors.filter(value => { return value.path === 'username'; });
    const emailErrors = errors.filter(value => { return value.path === 'email'; });
    const passwordErrors = errors.filter(value => { return value.path === 'password'; });
    const mode = registering ? 'Register' : 'Login';
    let usernameClassnames = styles.controlGroup;
    let emailClassnames = styles.controlGroup;
    let passwordClassnames = styles.controlGroup;
    if (usernameErrors.length > 0) { usernameClassnames += ` ${styles.controlGroupError}`; }
    if (emailErrors.length > 0) { emailClassnames += ` ${styles.controlGroupError}`; }
    if (passwordErrors.length > 0) { passwordClassnames += ` ${styles.controlGroupError}`; }

    return <div className={styles.root}>
      <form id={styles.registrationForm} onSubmit={this.handleSubmit}>
        <div className={emailClassnames}>
          <label htmlFor={styles.registerEmail}>Email</label>
          {
            emailErrors.map( errorObject => {
                return <span className={styles.errorMessage}>{errorObject.message}</span>;
              })
          }
          <input name="email" type="email" id={styles.registerEmail} />
        </div>
        {
           registering ?
             <div className={usernameClassnames}>
              <label htmlFor={styles.registerUsername}>Username</label>
               {
                 usernameErrors.map( errorObject => {
                   return <span className={styles.errorMessage}>{errorObject.message}</span>;
                 })
               }
              <input name="username" type="text" id={styles.registerUsername} />
            </div> : null
        }
        <div className={passwordClassnames}>
          <label htmlFor={styles.registerPassword}>Password</label>
          {
            passwordErrors.map( errorObject => {
              return <span className={styles.errorMessage}>{errorObject.message}</span>;
            })
          }
          <input name="password" type="password" id={styles.registerPassword} />
        </div>
        <button id={styles.submitButton} type="submit">{mode}</button>
        <span className={styles.toggleMode} onClick={toggleRegisterMode}>Don't have an account? Click here to register. </span>
      </form>
    </div>;
  }
}

export default withStyles(styles)(Authenticator);
