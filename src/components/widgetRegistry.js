import React from 'react';
import UserBlock from './UserBlock/UserBlock';
import Ratings from './Ratings/Ratings';
import PostEditor from './PostEditor/PostEditor';
import Watchlist from './Watchlist/Watchlist';

import dragSourceTarget from './DragSourceTarget/DragSourceTarget';

const widgetRegistry = {};

widgetRegistry.userblock = dragSourceTarget(UserBlock);
widgetRegistry.ratings = dragSourceTarget(Ratings);
widgetRegistry.posteditor = dragSourceTarget(PostEditor);
widgetRegistry.watchlist = dragSourceTarget(Watchlist);


export default widgetRegistry;