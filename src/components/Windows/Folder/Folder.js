import React, { PropTypes } from 'react';
import styles from './Folder.css'; //eslint-disable-line
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import FolderItem from '../FolderItem';
import FolderSidebar from '../FolderSidebar';
import FolderNavigation from '../FolderNavigation';

function Folder({openedFile, fileSystem, desktopWidth, desktopHeight, openFile}) {
  const folderContents = null;
  // const folderContents = fileSystem[openedFile.nodeIndex].children ? fileSystem[openedFile.nodeIndex].children.map((nodeIndex, index) => {
  //   fileSystem[nodeIndex].index = entityId;
  //   return <FolderItem key={index} desktopWidth={desktopWidth} desktopHeight={desktopHeight} index={index} openFile={openFile} item={entities[entityId]} />;
  // }) : null;
  const windowHeight = openedFile.height - 30;

  return (
    <div style={{minHeight: windowHeight}} className={styles.root}>
      <FolderNavigation />
      <div className={styles.sidebarAndFolderContents}>
        <FolderSidebar />
        <div className={styles.folderContents}>
          {folderContents}
        </div>
      </div>
    </div>
  );
}

Folder.propTypes = {
  entityID: PropTypes.number
};
export default withStyles(styles)(Folder);
