import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './PersonalInfo.css'; //eslint-disable-line
import cx from 'classnames';

function PersonalInfo({ first, last, handle }) {
  return (
    <div className={cx(styles.root, 'row middle-lg middle-md middle-xs middle-sm')}>
      <a href="#" className={cx(styles.image, 'col-lg-6 col-md-6 col-sm-6 col-xs-6')} >
        <img src="http://placehold.it/130x130.png" alt="user placeholder" />
      </a>
      <div className={cx(styles.username, 'col-lg-6 col-md-6 col-sm-6 col-xs-6')}>
        <a href="#" className={styles.name}>
          {first} {last}
          <br />
          <span className={styles.handle}>{handle}</span>
        </a>
        <br />
        <span className={styles.timezone}>
          (GMT-04:00)   America/New_York
        </span>
      </div>
    </div>
  );
}

PersonalInfo.propTypes = {
  first: PropTypes.string,
  last: PropTypes.string,
  handle: PropTypes.string,
};
export default withStyles(styles)(PersonalInfo);
