import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Taskbar.css'; //eslint-disable-line
import { windowsClickables } from '../../../constants/windows';
import StartButton from '../StartButton';
import InfoHub from '../InfoHub';

class Taskbar extends Component {
  static propTypes = {
    toggleStartMenu: PropTypes.func,
    openedFiles: PropTypes.array,
    entities: PropTypes.object
  };
  // shouldComponentUpdate() {
  //   return false;
  // }
  render() {
    const { toggleStartMenu, openedFiles, entities } = this.props;
    return (
      <div className={styles.root}>
        <StartButton toggleStartMenu={toggleStartMenu} />
        {
          openedFiles.map((openedFile, index) => {
            const { icon, name } = entities[openedFile.entityId];
            return <img data-clickClass={windowsClickables.desktopItemIcon} className={styles.icon} src={icon} alt={`${name} icon`} />;
          })
        }
        <InfoHub />
      </div>
    );
  }
}


export default withStyles(styles)(Taskbar);
