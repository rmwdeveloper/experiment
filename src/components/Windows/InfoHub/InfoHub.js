import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './InfoHub.css'; //eslint-disable-line
import cx from 'classnames';
import computerIcon from './xpComputerXSmall.png'; //eslint-disable-line
import SimpleTimer from '../../SimpleTimer'; //eslint-disable-line

function InfoHub({ className }) {
  return (
    <div className={styles.root}>
      <i className={cx(styles.infoImage, 'fa fa-database')} width="30" height="29" alt="Space Available Indicator" />
      <i className={cx(styles.infoImage, 'fa fa-bullseye')} width="30" height="29" alt="Space Available Indicator" />
      {/*<img className={styles.infoImage} src={computerIcon} width="30" height="29" alt="My Computer Icon for taskbar" /> */}
      <SimpleTimer />
    </div>
  );
}

InfoHub.propTypes = {
  className: PropTypes.string
};
export default withStyles(styles)(InfoHub);
