import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Taskbar.css'; //eslint-disable-line
import StartButton from '../StartButton';
import InfoHub from '../InfoHub';

class Taskbar extends Component {
  static propTypes = {
    toggleStartMenu: PropTypes.func,
    openedFiles: PropTypes.object,
    entities: PropTypes.object
  };

  render() {
    const { toggleStartMenu, openedFiles, fileSystem, clickTaskbarItem } = this.props;
    console.log(openedFiles);
    console.log(this.props);
    return (
      <div className={styles.root}>
        <StartButton toggleStartMenu={toggleStartMenu} />
        {
          Object.keys(openedFiles).map((openedFile, index) => {
            const { metadata: {icon}, name } = fileSystem[openedFiles[openedFile]];
            return <img key={openedFile} onClick={() => { clickTaskbarItem(openedFile.entityId)}} className={styles.icon} src={icon} alt={`${name} icon`} />;
          })
        }
        <InfoHub />
      </div>
    );
  }
}


export default withStyles(styles)(Taskbar);
