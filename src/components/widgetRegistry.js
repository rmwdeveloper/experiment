import UserBlock from './UserBlock/UserBlock';
import Ratings from './Ratings/Ratings';
import PostEditor from './PostEditor/PostEditor';
import Watchlist from './Watchlist/Watchlist';


const widgetRegistry = {};

widgetRegistry.userblock = UserBlock;
widgetRegistry.ratings = Ratings;
widgetRegistry.posteditor = PostEditor;
widgetRegistry.watchlist = Watchlist;


export default widgetRegistry;