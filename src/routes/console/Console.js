import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Console.css';
import ConsoleInput from '../../components/ConsoleInput';

const title = 'Console';

function Console(props, context) {
  context.setTitle(title);
  return (
    <div className={styles.root}>
      <ConsoleInput className={styles.consoleInput} />
    </div>
  );
}

Console.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(styles)(Console);
