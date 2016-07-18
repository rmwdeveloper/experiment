import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './PersonalInfo.css'; //eslint-disable-line
import cx from 'classnames';

function PersonalInfo({first, last, handle}) {
  return (
    <div className={styles.root}>
      <a href="#" className={styles.image} >
        <img src="http://placehold.it/65x65.png" alt="user placeholder" />
      </a>
      <div className={styles.username}>
        <a href="#" className={styles.image}>
          {first} {last}
          <br />
          <span className={styles.handle}>{handle}</span>
        </a>
      </div>
    </div>
  );
}

export default withStyles(styles)(PersonalInfo);
