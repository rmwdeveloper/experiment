import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './WindowsStartMenuProgramsListItem.css'; //eslint-disable-line


function WindowsStartMenuProgramListItem({programName, programData}) {
  return (
    <div className={styles.root}>
      <img src={programData.icon} alt={`${programName} logo`} />
      {programName}
      {programData.subtext}
    </div>
  );
}

WindowsStartMenuProgramListItem.propTypes = {

};
export default withStyles(styles)(WindowsStartMenuProgramListItem);
