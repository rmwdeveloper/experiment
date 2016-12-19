import React, { PropTypes } from 'react';
import styles from './Folder.css'; //eslint-disable-line
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import DesktopItem from '../DesktopItem';

function Folder({openedFile, entities, desktopWidth, desktopHeight, openFile}) {
  const folderContents = entities[openedFile.entityId].contents ? entities[openedFile.entityId].contents.map((entityId, index) => {
    return <DesktopItem key={index} desktopWidth={desktopWidth} desktopHeight={desktopHeight} index={index} openFile={openFile} item={entites[entityId]} />;
  }) : null;

  return (
    <div className={styles.root}>
      {folderContents}
    </div>
  );
}

Folder.propTypes = {
  entityID: PropTypes.number
};
export default withStyles(styles)(Folder);
