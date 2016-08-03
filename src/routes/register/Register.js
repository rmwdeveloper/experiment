import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Register.css';
import sendFormData from '../../core/sendFormData';
import RegistrationForm from '../../components/RegistrationForm';


class Register extends Component {
  constructor() {
    super();
    this.submitForm = this.submitForm.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.usernameChange = this.usernameChange.bind(this);
    this.state = {
      username: '',
      password: ''
    };
  }
  shouldComponentUpdate() {
    return false;
  }
  usernameChange(event) {
    this.setState({username: event.target.value});
  }
  passwordChange(event) {
    this.setState({password: event.target.value});
  }
  submitForm(event) {
    event.preventDefault();
    sendFormData({username: this.state.username, password: this.state.password});
    
  }
  render() {
    return (
      <div className={s.root}>
        <RegistrationForm usernameChange={this.usernameChange} passwordChange={this.passwordChange} submit={this.submitForm} />
      </div>
    );
  }
}

Register.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Register);
