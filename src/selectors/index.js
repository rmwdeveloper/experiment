import { createSelector } from 'reselect';
import path from 'path';

const startMenuProgramsIndices = state => state.windows.startMenuProgramsIndices;
const userDirectoriesIndices = state => state.windows.userDirectoriesIndices;
const computerSettingsIndices = state => state.windows.computerSettingsIndices;
const utilityControlsIndices = state => state.windows.utilityControlsIndices;
const authenticatorIndex = state => state.windows.authenticatorIndex;

const fileSystemObject = state => state.windows.fileSystem;
const desktopNodeIndex = state => state.windows.desktopNodeIndex;

const userObject = state => state.auth.user;

export const isAnonymousUserSelector = createSelector(
  [userObject],
  (userObject) => {
    return Object.keys(userObject).length === 0 && userObject.constructor === Object;
  }
);

export const authenticatorSelector = createSelector(
  [fileSystemObject, authenticatorIndex],
  (fileSystemObject, authenticatorIndex) => {
    const authenticator = fileSystemObject[authenticatorIndex];
    authenticator.index = authenticatorIndex;
    return authenticator;
  }
);
export const installedProgramsSelector = createSelector(
  [fileSystemObject, startMenuProgramsIndices],
  (fileSystemObject, startMenuProgramsIndices) => {
    return startMenuProgramsIndices.map(index => {return fileSystemObject[index]});
  }
);

export const userDirectoriesSelector = createSelector(
  [fileSystemObject, userDirectoriesIndices],
  (fileSystemObject, userDirectoriesIndices) => {
    return userDirectoriesIndices.map(index => {return fileSystemObject[index]});
  }
);

export const computerSettingsSelector = createSelector(
  [fileSystemObject, computerSettingsIndices],
  (fileSystemObject, computerSettingsIndices) => {
    return computerSettingsIndices.map(index => {return fileSystemObject[index]});
  }
);

export const utilityControlsSelector = createSelector(
  [fileSystemObject, utilityControlsIndices],
  (fileSystemObject, utilityControlsIndices) => {
    return utilityControlsIndices.map(index => {return fileSystemObject[index]});
  }
);

export const desktopItemsSelector = createSelector(
  [fileSystemObject, desktopNodeIndex],
  (fileSystemObject, desktopNodeIndex) => {
    console.log(desktopNodeIndex);
    const desktopNode = fileSystemObject[desktopNodeIndex];
    console.log(desktopNode);
    return desktopNode.children.map(childIndex => {
      const obj = fileSystemObject[childIndex];
      obj.index = childIndex;
      return obj;
    });
  }
);

