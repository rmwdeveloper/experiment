import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './ConsoleInput.css'; //eslint-disable-line
import cx from 'classnames';

function ConsoleInput(props) {
  return (
    <div className={cx(styles.root, props.className)}>
      <input type="text" />
    </div>
  );
}

ConsoleInput.propTypes = {
  className: PropTypes.string
};
export default withStyles(styles)(ConsoleInput);
