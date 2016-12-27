import { createSelector } from 'reselect';
import path from 'path';

// const entitiesObject = state => state.windows.entities;
// const installedProgramsIndices = state => state.windows.installedPrograms;
// const userDirectoriesIndices = state => state.windows.userDirectories;
// const computerSettingsIndices = state => state.windows.computerSettings;
// const utilityControlsIndices = state => state.windows.utilityControls;
// const desktopItemsIndices = state => state.windows.desktopItems;

const startMenuProgramsIndices = state => state.windows.startMenuProgramsIndices;
const userDirectoriesIndices = state => state.windows.userDirectoriesIndices;
const computerSettingsIndices = state => state.windows.computerSettingsIndices;
const utilityControlsIndices = state => state.windows.utilityControlsIndices;
  
const fileSystemObject = state => state.windows.fileSystem;
const desktopNodeIndex = state => state.windows.desktopNodeIndex;

export const installedProgramsSelector = createSelector(
  [fileSystemObject, startMenuProgramsIndices],
  (fileSystemObject, startMenuProgramsIndices) => {
    return startMenuProgramsIndices.map(index => {return fileSystemObject[index]});
  }
);

// export const userDirectoriesSelector = createSelector(
//   [entitiesObject, userDirectoriesIndices],
//   (entities, userDirectories) => {
//     return userDirectories.map(index => {
//       return entities[index];
//     });
//   }
// );
// export const computerSettingsSelector = createSelector(
//   [entitiesObject, computerSettingsIndices],
//   (entities, computerSettings) => {
//     return computerSettings.map(index => {
//       return entities[index];
//     });
//   }
// );
//
// export const utilityControlsSelector = createSelector(
//   [entitiesObject, utilityControlsIndices],
//   (entities, utilityControls) => {
//     return utilityControls.map(index => {
//       return entities[index];
//     });
//   }
// );
//
export const desktopItemsSelector = createSelector(
  [fileSystemObject, desktopNodeIndex],
  (fileSystemObject, desktopNodeIndex) => {
    const desktopNode = fileSystemObject[desktopNodeIndex];
    return desktopNode.children.map(childIndex => {
      return fileSystemObject[childIndex];
    });

  }
);

