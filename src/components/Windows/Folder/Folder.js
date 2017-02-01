import React, { PropTypes } from 'react';
import styles from './Folder.css'; //eslint-disable-line
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import FolderItem from '../FileIcon';
import FolderSidebar from '../FolderSidebar';
import FolderNavigation from '../FolderNavigation';
import FolderContents from '../FolderContents';


function Folder({openedFile, index, uniqueId, openedFileDimensions, selectedDesktopIcons, clearActives, fileSystem, selectIcons, openFile, moveFile, moveFiles}) {
  const selectedIds = selectedDesktopIcons.map(id => {return parseInt(id, 10)});
  const folderContents = fileSystem[openedFile.index].children ? fileSystem[openedFile.index].children.map((nodeIndex, index) => {
    fileSystem[nodeIndex].index = nodeIndex;

    return <FolderItem moveFile={moveFile} moveFiles={moveFiles} className="folderIcon" parentIndex={openedFile.index} selected={selectedIds.includes(nodeIndex)}
                       key={nodeIndex} index={index} openFile={openFile} item={fileSystem[nodeIndex]} />;
  }) : null;
  const windowHeight = openedFileDimensions[uniqueId].height - 30;


  return (
    <div style={{minHeight: windowHeight}} className={styles.root}>
      <FolderNavigation />
      <div className={styles.sidebarAndFolderContents}>
        <FolderSidebar />
        <FolderContents clearActives={clearActives} selectIcons={selectIcons} children={fileSystem[openedFile.index].children}
          moveFile={moveFile} moveFile={moveFiles} folderContents={folderContents} index={openedFile.index} />
      </div>
    </div>
  );
}

Folder.propTypes = {
  entityID: PropTypes.number
};
export default withStyles(styles)(Folder);
