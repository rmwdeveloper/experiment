import React, { PropTypes } from 'react';
import styles from './Folder.css'; //eslint-disable-line
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import FolderItem from '../FolderItem';
import FolderSidebar from '../FolderSidebar';

function Folder({openedFile, entities, desktopWidth, desktopHeight, openFile}) {
  const folderContents = entities[openedFile.entityId].contents ? entities[openedFile.entityId].contents.map((entityId, index) => {
    entities[entityId].index = entityId;
    return <FolderItem key={index} desktopWidth={desktopWidth} desktopHeight={desktopHeight} index={index} openFile={openFile} item={entities[entityId]} />;
  }) : null;
  const windowHeight = openedFile.height - 30;

  return (
    <div style={{minHeight: windowHeight}} className={styles.root}>
      <FolderSidebar />
      <div className={styles.folderContents}>
        {folderContents}
      </div>
    </div>
  );
}

Folder.propTypes = {
  entityID: PropTypes.number
};
export default withStyles(styles)(Folder);
