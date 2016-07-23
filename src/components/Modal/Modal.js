import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Modal.css'; //eslint-disable-line


function Modal({ id, modalContent, modalVisible, closeModal }) {
  const display = modalVisible ? 'block' : 'none';
  return (
    <div id={id} style={{display}} className={styles.root}>
      <div className={styles.modalInner}>
        <div className={styles.modalBody}>
          {modalContent}
        </div>
        <div className={styles.modalFooter}>
          <button type="button" onClick={closeModal}>Close</button>
        </div>

      </div>
    </div>
  );
}

export default withStyles(styles)(Modal);
