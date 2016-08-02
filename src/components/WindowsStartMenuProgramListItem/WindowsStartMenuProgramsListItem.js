import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './WindowsStartMenuProgramsListItem.css'; //eslint-disable-line


function WindowsStartMenuProgramListItem({programName, programData}) {
  return (
    <div className={styles.root}>
      <div className={styles.iconContainer}>
        <img src={programData.icon} alt={`${programName} logo`} />
      </div>
      <div className={styles.textContainer}>
        <span className={styles.programName}>{programName}</span>
        <span className={styles.programSubtext}>{programData.subtext}</span>
      </div>
    </div>
  );
}

WindowsStartMenuProgramListItem.propTypes = {

};
export default withStyles(styles)(WindowsStartMenuProgramListItem);
