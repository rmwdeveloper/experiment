import React, { PropTypes } from 'react';
import styles from './Folder.css'; //eslint-disable-line
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import FolderItem from '../FileIcon';
import FolderSidebar from '../FolderSidebar';
import FolderNavigation from '../FolderNavigation';
import FolderContents from '../FolderContents';
import FolderIconsGroup from '../FileIconGroup';

function Folder({openedFile, selectedDesktopIcons, clearActives, fileSystem, selectIcons, desktopWidth, desktopHeight, openFile, moveFile, moveFiles}) {
  const folderContents = []; // todo refactor this. (Settle this with Desktops folder contents )

  const selectedFileIndices = selectedDesktopIcons.map(iconId => {return parseInt(iconId, 10)});
  const unselectedFileIndices = fileSystem[openedFile.nodeIndex].children;
  const renderArray = unselectedFileIndices.map(index => {
    return selectedFileIndices.includes(index) ? 'selected' : index;
  });
  const cleanedRenderArray = renderArray.filter((item, position) => {
    return renderArray.indexOf(item) === position;
  });
  for (let iterator = 0; iterator < cleanedRenderArray.length; iterator++){
    if (typeof(cleanedRenderArray[iterator]) === 'number') {
      const file = fileSystem[cleanedRenderArray[iterator]];
      file.index = cleanedRenderArray[iterator];
      folderContents.push(<FolderItem className='folderIcon' key={file.index} desktopWidth={desktopWidth} desktopHeight={desktopHeight}
                                          moveFile={moveFile}  openFile={openFile} item={file} />);
    }
    if (cleanedRenderArray[iterator] === 'selected') {
      folderContents.push(<FolderIconsGroup parentIndex={openedFile.index} className='folderIcon'
                                                moveFiles={moveFiles} key={iterator} fileSystem={fileSystem} selectedFileIndices={selectedFileIndices} />);
    }
  }
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
