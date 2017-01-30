import FileWindow from './FileWindow/FileWindow';
import Folder from './Folder/Folder';
import Word from '../Word/Word/Word';
import EmptyProgram from './EmptyProgram/EmptyProgram';
import Authenticator from './Authenticator/Authenticator';
import DiskManager from './DiskManager/DiskManager';
import ErrorWindow from './ErrorWindow/ErrorWindow';

export default function windowsRegistry(fileType, openedFileNode) {
  switch (fileType) {
    case 'Folder':
      return FileWindow(Folder);
    case 'shct':
    case 'exe':
      switch (openedFileNode.name) {
        case 'Authenticator':
          return FileWindow(Authenticator);
        case 'Word Processor':
          return FileWindow(Word);
        case 'Disk Manager':
          return FileWindow(DiskManager);
        case 'Error Displayer':
          return FileWindow(ErrorWindow)
        default:
          return FileWindow(EmptyProgram);
      }
      break;
    default:
      console.log(fileType, openedFileNode.name);
      return FileWindow(EmptyProgram);
  }
}

