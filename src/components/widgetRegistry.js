import React from 'react';
import UserBlock from './UserBlock/UserBlock';
import Ratings from './Ratings/Ratings';
import PostEditor from './PostEditor/PostEditor';
import Watchlist from './Watchlist/Watchlist';
import StockInfoTable from './StockInfoTable/StockInfoTable';

const widgetRegistry = {};

widgetRegistry.userblock = UserBlock;
widgetRegistry.ratings = Ratings;
widgetRegistry.posteditor = PostEditor;
widgetRegistry.watchlist = Watchlist;
widgetRegistry.stockinfotable = StockInfoTable;


export default widgetRegistry;