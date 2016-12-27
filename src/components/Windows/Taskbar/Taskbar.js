import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Taskbar.css'; //eslint-disable-line
import StartButton from '../StartButton';
import InfoHub from '../InfoHub';

class Taskbar extends Component {
  static propTypes = {
    toggleStartMenu: PropTypes.func,
    openedFiles: PropTypes.array,
    entities: PropTypes.object
  };

  render() {
    const { toggleStartMenu, openedFiles, entities, clickTaskbarItem } = this.props;
    return (
      <div className={styles.root}>
        <StartButton toggleStartMenu={toggleStartMenu} />
        { /*
          openedFiles.map((openedFile, index) => {
            const { icon, name } = entities[openedFile.entityId];
            return <img key={index} onClick={() => { clickTaskbarItem(openedFile.entityId)}}  className={styles.icon} src={icon} alt={`${name} icon`} />;
          }) */
        }
        <InfoHub />
      </div>
    );
  }
}


export default withStyles(styles)(Taskbar);
