import FileBaseTaskbar from './FileBaseTaskbar/FileBaseTaskbar';
import Folder from './Folder/Folder';

const windowsRegistry = {};

windowsRegistry.Folder = FileBaseTaskbar(Folder);
export default windowsRegistry;