import top from './sides/top';
import front from './sides/front';
import bottom from './sides/bottom';
import back from './sides/back';
import left from './sides/left';
import right from './sides/right';


// Template Registry for the Contact Form Widget
const sideMarkupRegistry = {};

sideMarkupRegistry.top = top;
sideMarkupRegistry.front = front;
sideMarkupRegistry.back = back;
sideMarkupRegistry.bottom = bottom;
sideMarkupRegistry.left = left;
sideMarkupRegistry.right = right;


export default sideMarkupRegistry;
