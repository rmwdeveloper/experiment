import FileWindow from './FileWindow/FileWindow';
import Folder from './Folder/Folder';
import Word from './Word/Word';

const windowsRegistry = {};

windowsRegistry.Folder = FileWindow(Folder);
windowsRegistry.Word = FileWindow(Word);
export default windowsRegistry;