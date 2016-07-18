import UserBlock from './UserBlock/UserBlock';
import Ratings from './Ratings/Ratings';
import PostEditor from './PostEditor/PostEditor';
import Watchlist from './Watchlist/Watchlist';
import LayoutCell from './LayoutCell/LayoutCell';

import dragSourceTarget from './DragSourceTarget/DragSourceTarget';

const widgetRegistry = {};

widgetRegistry.userblock = dragSourceTarget(LayoutCell);
widgetRegistry.ratings = dragSourceTarget(LayoutCell);
widgetRegistry.posteditor = dragSourceTarget(LayoutCell);
widgetRegistry.watchlist = dragSourceTarget(LayoutCell);


export default widgetRegistry;