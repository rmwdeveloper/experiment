import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './StartMenuProgramsListItem.css'; //eslint-disable-line


function StartMenuProgramListItem({ programData }) {
  return (
    <div className={styles.root}>
      <div className={styles.iconContainer}>
        <img src={programData.metadata.icon} alt={`${programData.name} logo`} />
      </div>
      <div className={styles.textContainer}>
        <span className={styles.programName}>{programData.name}</span>
        <span className={styles.programSubtext}>{programData.subtext}</span>
      </div>
    </div>
  );
}

StartMenuProgramListItem.propTypes = {

};
export default withStyles(styles)(StartMenuProgramListItem);
