import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './WindowsStartMenuProgramsListing.css'; //eslint-disable-line

import WindowStartMenuProgramsListItem from '../WindowsStartMenuProgramListItem';
class WindowsStartMenuProgramsListing extends Component {
  static propTypes = {
    installedPrograms: PropTypes.object
  };

  render() {
    const { installedPrograms } = this.props;
    return (
      <ul className={styles.root}>
        {
          Object.keys(installedPrograms).map( programName=> {
            return <WindowStartMenuProgramsListItem programData={installedPrograms[programName]} />
          })
        }
      </ul>
    );
  }
}

WindowsStartMenuProgramsListing.propTypes = {

};
export default withStyles(styles)(WindowsStartMenuProgramsListing);
