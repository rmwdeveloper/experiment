import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './StartMenuProgramsListing.css'; //eslint-disable-line

import StartMenuProgramsListItem from '../StartMenuProgramListItem';

class StartMenuProgramsListing extends Component {
  static propTypes = {
    installedPrograms: PropTypes.object
  };

  render() {
    const { installedPrograms } = this.props;
    return (
      <ul className={styles.root}>
        {
          Object.keys(installedPrograms).map(programName=> {
            return <StartMenuProgramsListItem key={programName} programData={installedPrograms[programName]} />;
          }) 
        }
      </ul>
    );
  }
}

StartMenuProgramsListing.propTypes = {

};
export default withStyles(styles)(StartMenuProgramsListing);
