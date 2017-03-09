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

    return (
      <div className={styles.root}>
        <StartButton toggleStartMenu={toggleStartMenu} />
        {
          Object.keys(openedFiles).map((openedFile) => {
            const { metadata: {icon, sprite, backgroundPosition}, name, index } = fileSystem[openedFiles[openedFile]];
            const style = {background: `url(${icon})`};
            if (sprite) {
              style.backgroundSize = '425px';
              style.backgroundPosition = backgroundPosition;
            }

            return <div style={style} key={index} data-index={index} className={styles.icon}> </div>;

          })
        }
        <InfoHub />
      </div>
    );
  }
}


export default withStyles(styles)(Taskbar);
