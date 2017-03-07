import top from './sides/top';
import ProjectRows from '../ProjectRows';
import bottom from './sides/bottom';
import back from './sides/back';
import left from './sides/left';
import right from './sides/right';


// Template Registry for the Contact Form Widget
const sideMarkupRegistry = {};

sideMarkupRegistry.top = top;
sideMarkupRegistry.front = ProjectRows('professional');
sideMarkupRegistry.back = ProjectRows('personal')
sideMarkupRegistry.bottom = bottom;
sideMarkupRegistry.left = left;
sideMarkupRegistry.right = right;


export default sideMarkupRegistry;
