import React, { PropTypes } from 'react';
import styles from './EmptyProgram.css'; //eslint-disable-line
import withStyles from 'isomorphic-style-loader/lib/withStyles';



function EmptyProgram({}) {
  return <div className={styles.root}>
    <p>A problem has been detected and this program cannot start.</p>
    <p>PROGRAM NOT IMPLEMENTED</p>
    <p>Technical Information:</p>
    <p>*** STOP: 0x000000ED (0X80F128D0, 0xc000009c, 0X0000000, 0x00000000)</p>
    <p>*** STOP: 0X80F128D0 (0X80F128D0, 0X80F128D0, 0xc000009c, 0x00000000)</p>
    <p>*** STOP: 0x000000ED (0X80F128D0, 0xc000009c, 0X80F128D0, 0x00000000)</p>
    <p>*** STOP: 0x000000ED (0X80F128D0, 0xc000009c, 0X0000000, 0X80F128D0)</p>
  </div>;
}

EmptyProgram.propTypes = {
  entityID: PropTypes.number
};
export default withStyles(styles)(EmptyProgram);
