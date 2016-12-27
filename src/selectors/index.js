import { createSelector } from 'reselect';


const entitiesObject = state => state.windows.entities;
const installedProgramsIndices = state => state.windows.installedPrograms;
const userDirectoriesIndices = state => state.windows.userDirectories;
const computerSettingsIndices = state => state.windows.computerSettings;
const utilityControlsIndices = state => state.windows.utilityControls;
const desktopItemsIndices = state => state.windows.desktopItems;

// export const installedProgramsSelector = createSelector(
//   [entitiesObject, installedProgramsIndices],
//   (entities, installedPrograms) => {
//     return installedPrograms.map(index => {
//       const program = { ...entities[index] };
//       program.index = index;
//       return program;
//     });
//   }
// );
//
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
// export const desktopItemsSelector = createSelector(
//   [entitiesObject, desktopItemsIndices],
//   (entities, desktopItems) => {
//     return desktopItems.map(index => {
//       const program = { ...entities[index] };
//       program.index = index;
//       return program;
//     });
//   }
// );
//
