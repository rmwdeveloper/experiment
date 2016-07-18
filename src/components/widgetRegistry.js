import UserBlock from './UserBlock/UserBlock';
import Ratings from './Ratings/Ratings';
import PostEditor from './PostEditor/PostEditor';
import Watchlist from './Watchlist/Watchlist';

import DragSourceTarget from './DragSourceTarget/DragSourceTarget';

const widgetRegistry = {};

widgetRegistry.userblock = UserBlock;
widgetRegistry.ratings = Ratings;
widgetRegistry.posteditor = PostEditor;
widgetRegistry.watchlist = Watchlist;


export default widgetRegistry;