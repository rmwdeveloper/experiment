import WindowsFileBaseTaskbar from './WindowsFileBaseTaskbar/WindowsFileBaseTaskbar';
import WindowsFolder from './WindowsFolder/WindowsFolder';

const windowsRegistry = {};

windowsRegistry.Folder = WindowsFileBaseTaskbar(WindowsFolder);
export default windowsRegistry;