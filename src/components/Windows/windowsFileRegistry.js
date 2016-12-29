import FileWindow from './FileWindow/FileWindow';
import Folder from './Folder/Folder';
import Word from '../Word/Word/Word';

const windowsRegistry = {};

windowsRegistry.Folder = FileWindow(Folder);

/* Start Works In Progress */
windowsRegistry.exe = FileWindow(Word);
windowsRegistry.shct = FileWindow(Word);
/* End Works In Progress*/
export default windowsRegistry;