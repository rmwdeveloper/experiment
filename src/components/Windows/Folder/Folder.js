import React, { PropTypes } from 'react';
import styles from './Folder.css'; //eslint-disable-line
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import FolderItem from '../FileIcon';
import FolderSidebar from '../FolderSidebar';
import FolderNavigation from '../FolderNavigation';
import FolderContents from '../FolderContents';

// todo: convert to component and just pass all props through. Clunky func = bad.
function Folder({openedFile, user, checkAvailableSpace, uploadStart, uploadProgress, uploadComplete,
  uploads,
  isAnonymousUser, uniqueId, openedFileDimensions, selectedDesktopIcons, clearActives, fileSystem, selectIcons,
  openFile, moveFile, moveFiles}) {
  const folderContents = fileSystem[openedFile.index].children ? fileSystem[openedFile.index].children.map((nodeIndex, index) => {
    fileSystem[nodeIndex].index = nodeIndex;
    return <FolderItem moveFile={moveFile} clickClass='folderItem' moveFiles={moveFiles} className="folderIcon" parentIndex={openedFile.index} selected={selectedDesktopIcons.includes(nodeIndex)}
                       key={nodeIndex} index={index} openFile={openFile} item={fileSystem[nodeIndex]} />;
  }) : null;
  const windowHeight = openedFileDimensions[uniqueId].height - 30;
  return (
    <div style={{minHeight: windowHeight}} className={styles.root}>
      <FolderNavigation />
      <div className={styles.sidebarAndFolderContents}>
        <FolderSidebar />
        <FolderContents clearActives={clearActives} user={user} isAnonymousUser={isAnonymousUser}
                        checkAvailableSpace={checkAvailableSpace} uploadStart={uploadStart}
                        uploadProgress={uploadProgress} uploadComplete={uploadComplete}
                        fileSystem={fileSystem} uploads={uploads} uniqueId={uniqueId}
                        selectIcons={selectIcons} children={fileSystem[openedFile.index].children}
          moveFile={moveFile} moveFile={moveFiles} folderContents={folderContents} index={openedFile.index} />
      </div>
    </div>
  );
}

Folder.propTypes = {
  entityID: PropTypes.number
};
export default withStyles(styles)(Folder);
