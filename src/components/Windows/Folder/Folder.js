import React, { PropTypes } from 'react';
import styles from './Folder.css'; //eslint-disable-line
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import FolderItem from '../FileIcon';
import FolderSidebar from '../FolderSidebar';
import FolderNavigation from '../FolderNavigation';
import FolderContents from '../FolderContents';


function Folder({openedFile, selectedDesktopIcons, clearActives, fileSystem, selectIcons, desktopWidth, desktopHeight, openFile, moveFile, moveFiles}) {
  const selectedIds = selectedDesktopIcons.map(id => {return parseInt(id, 10)});
  const folderContents = fileSystem[openedFile.nodeIndex].children ? fileSystem[openedFile.nodeIndex].children.map((nodeIndex, index) => {
    fileSystem[nodeIndex].index = nodeIndex;
    return <FolderItem moveFile={moveFile} moveFiles={moveFiles} className="folderIcon" parentIndex={openedFile.nodeIndex} selected={selectedIds.includes(desktopitem.index)}
                       key={index} desktopWidth={desktopWidth} desktopHeight={desktopHeight} index={index} openFile={openFile} item={fileSystem[nodeIndex]} />;
  }) : null;
  // const folderContents = []; // todo refactor this. (Settle this with Desktops folder contents )
  //
  // const selectedFileIndices = selectedDesktopIcons.map(iconId => {return parseInt(iconId, 10)});
  // const unselectedFileIndices = fileSystem[openedFile.nodeIndex].children;
  // const renderArray = unselectedFileIndices.map(index => {
  //   return selectedFileIndices.includes(index) ? 'selected' : index;
  // });
  // const cleanedRenderArray = renderArray.filter((item, position) => {
  //   return renderArray.indexOf(item) === position;
  // });
  // for (let iterator = 0; iterator < cleanedRenderArray.length; iterator++){
  //   if (typeof(cleanedRenderArray[iterator]) === 'number') {
  //     const file = fileSystem[cleanedRenderArray[iterator]];
  //     file.index = cleanedRenderArray[iterator];
  //     folderContents.push(<FolderItem className='folderIcon' key={file.index} desktopWidth={desktopWidth} desktopHeight={desktopHeight}
  //                                         moveFile={moveFile}  openFile={openFile} item={file} />);
  //   }
  //   if (cleanedRenderArray[iterator] === 'selected') {
  //     folderContents.push(<FolderIconsGroup parentIndex={openedFile.index} className='folderIcon'
  //                                               moveFiles={moveFiles} key={iterator} fileSystem={fileSystem} selectedFileIndices={selectedFileIndices} />);
  //   }
  // }
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
