import FileWindow from './FileWindow/FileWindow';
import Folder from './Folder/Folder';

const windowsRegistry = {};

windowsRegistry.Folder = FileWindow(Folder);
export default windowsRegistry;