
import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Login.css';
import querystring from 'querystring';
const title = 'Log In';

class Login extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.usernameChange = this.usernameChange.bind(this);
    this.state = {
      username: '',
      password: ''
    };
  }
  onSubmit(event) {
    event.preventDefault();
    const xHTTP = new XMLHttpRequest();
    const data = new FormData();
    data.username = this.state.username;
    data.password = this.state.password;
    xHTTP.onreadystatechange = function() {
      if (xHTTP.readyState === 4 ) {
        const { status, statusText, responseText } = xHTTP;
        const response = JSON.parse(xHTTP.responseText);
        if (status === 200 && statusText === 'OK') {
          // console.log(responseText);
        } else {
          // console.log('failure');
        }
      }
    };
    xHTTP.open('POST', 'login', true);
    xHTTP.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xHTTP.send(querystring.encode(data));
  }
  usernameChange(event) {
    this.setState({username: event.target.value});
  }
  passwordChange(event) {
    this.setState({password: event.target.value});
  }
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{title}</h1>
          <p className={s.lead}>Log in with your username or company email address.</p>
          <div className={s.formGroup}>
            <a className={s.facebook} href="/login/facebook">
              <svg
                className={s.icon}
                width="30"
                height="30"
                viewBox="0 0 30 30"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22 16l1-5h-5V7c0-1.544.784-2 3-2h2V0h-4c-4.072 0-7 2.435-7 7v4H7v5h5v14h6V16h4z"
                />
              </svg>
              <span>Log in with Facebook</span>
            </a>
          </div>
          <div className={s.formGroup}>
            <a className={s.google} href="/login/google">
              <svg
                className={s.icon}
                width="30"
                height="30"
                viewBox="0 0 30 30"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d={'M30 13h-4V9h-2v4h-4v2h4v4h2v-4h4m-15 2s-2-1.15-2-2c0 0-.5-1.828 1-3 ' +
                '1.537-1.2 3-3.035 3-5 0-2.336-1.046-5-3-6h3l2.387-1H10C5.835 0 2 3.345 2 7c0 ' +
                '3.735 2.85 6.56 7.086 6.56.295 0 .58-.006.86-.025-.273.526-.47 1.12-.47 1.735 ' +
                '0 1.037.817 2.042 1.523 2.73H9c-5.16 0-9 2.593-9 6 0 3.355 4.87 6 10.03 6 5.882 ' +
                '0 9.97-3 9.97-7 0-2.69-2.545-4.264-5-6zm-4-4c-2.395 0-5.587-2.857-6-6C4.587 ' +
                '3.856 6.607.93 9 1c2.394.07 4.603 2.908 5.017 6.052C14.43 10.195 13 13 11 ' +
                '13zm-1 15c-3.566 0-7-1.29-7-4 0-2.658 3.434-5.038 7-5 .832.01 2 0 2 0 1 0 ' +
                '2.88.88 4 2 1 1 1 2.674 1 3 0 3-1.986 4-7 4z'}
                />
              </svg>
              <span>Log in with Google</span>
            </a>
          </div>
          <div className={s.formGroup}>
            <a className={s.twitter} href="/login/twitter">
              <svg
                className={s.icon}
                width="30"
                height="30"
                viewBox="0 0 30 30"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d={'M30 6.708c-1.105.49-2.756 1.143-4 1.292 1.273-.762 2.54-2.56 ' +
                '3-4-.97.577-2.087 1.355-3.227 1.773L25 5c-1.12-1.197-2.23-2-4-2-3.398 0-6 ' +
                '2.602-6 6 0 .4.047.7.11.956L15 10C9 10 5.034 8.724 2 5c-.53.908-1 1.872-1 ' +
                '3 0 2.136 1.348 3.894 3 5-1.01-.033-2.17-.542-3-1 0 2.98 4.186 6.432 7 7-1 ' +
                '1-4.623.074-5 0 .784 2.447 3.31 3.95 6 4-2.105 1.648-4.647 2.51-7.53 2.51-.5 ' +
                '0-.988-.03-1.47-.084C2.723 27.17 6.523 28 10 28c11.322 0 17-8.867 17-17 ' +
                '0-.268.008-.736 0-1 1.2-.868 2.172-2.058 3-3.292z'}
                />
              </svg>
              <span>Log in with Twitter</span>
            </a>
          </div>
          <strong className={s.lineThrough}>OR</strong>
          <form onSubmit={this.onSubmit} method="post">
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="username">
                Username or email address:
              </label>
              <input
                onChange={this.usernameChange}
                className={s.input}
                id="username"
                type="text"
                name="username"
                autoFocus
              />
            </div>
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="password">
                Password:
              </label>
              <input
                onChange={this.passwordChange}
                className={s.input}
                id="password"
                type="password"
                name="password"
              />
            </div>
            <div className={s.formGroup}>
              <button className={s.button} type="submit">
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Login.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Login);
