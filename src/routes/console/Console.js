import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Console.css';
import cx from 'classNames';
import ConsoleInput from '../../components/ConsoleInput';

const title = 'Console';
function Console(props, context) {
  context.setTitle(title);
  return (
    <div className={cx(styles.root, 'row bottom-lg')}>
      <ConsoleInput className={cx(styles.consoleInput, 'col-lg-12')} />
    </div>
  );
}

Console.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(styles)(Console);
