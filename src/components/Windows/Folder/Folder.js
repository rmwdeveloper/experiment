import React, { PropTypes } from 'react';
import styles from './Folder.css'; //eslint-disable-line
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import FolderItem from '../FileIcon';
import FolderSidebar from '../FolderSidebar';
import FolderNavigation from '../FolderNavigation';
import FolderContents from '../FolderContents';

function Folder({openedFile, clearActives, fileSystem, selectIcons, desktopWidth, desktopHeight, openFile, moveFile, moveFiles}) {
  const folderContents = fileSystem[openedFile.nodeIndex].children ? fileSystem[openedFile.nodeIndex].children.map((nodeIndex, index) => {
    fileSystem[nodeIndex].index = nodeIndex;
    return <FolderItem moveFile={moveFile} moveFiles={moveFiles} className="folderIcon"
                       key={index} desktopWidth={desktopWidth} desktopHeight={desktopHeight} index={index} openFile={openFile} item={fileSystem[nodeIndex]} />;
  }) : null;
  const windowHeight = openedFile.height - 30;

  return (
    <div style={{minHeight: windowHeight}} className={styles.root}>
      <FolderNavigation />
      <div className={styles.sidebarAndFolderContents}>
        <FolderSidebar />
        <FolderContents clearActives={clearActives} selectIcons={selectIcons}
          moveFile={moveFile} moveFile={moveFiles} folderContents={folderContents} index={openedFile.nodeIndex} />
      </div>
    </div>
  );
}

Folder.propTypes = {
  entityID: PropTypes.number
};
export default withStyles(styles)(Folder);
