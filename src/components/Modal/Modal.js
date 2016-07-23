import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Modal.css'; //eslint-disable-line


function Modal({ id, modalContent }) {
  return (
    <div id={id} className={styles.root}>
      <div className={styles.modalContent}>
        {modalContent}
      </div>
    </div>
  );
}

export default withStyles(styles)(Modal);
