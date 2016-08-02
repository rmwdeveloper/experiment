import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './RegistrationForm.css'; //eslint-disable-line

function RegistrationForm({submit, passwordChange, usernameChange}) {

  return (
    <form action="" method="post" encType="multipart/form-data" onSubmit={submit} className={styles.root}>
      <input onChange={usernameChange} name="username" type="text" placeholder="Username" />
      <input onChange={passwordChange} name="password" type="password" placeholder="Password" />
      <input type="submit" value="submit" />
    </form>
  );
}


RegistrationForm.propTypes = {};
export default withStyles(styles)(RegistrationForm);
