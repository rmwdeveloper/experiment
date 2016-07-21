import React from 'react';
import UserBlock from './UserBlock/UserBlock';
import Ratings from './Ratings/Ratings';
import PostEditor from './PostEditor/PostEditor';
import Watchlist from './Watchlist/Watchlist';
import StockInfoTable from './StockInfoTable/StockInfoTable';
import StockChart from './StockChart/StockChart';

const widgetRegistry = {};

widgetRegistry.userblock = UserBlock;
widgetRegistry.ratings = Ratings;
widgetRegistry.posteditor = PostEditor;
widgetRegistry.watchlist = Watchlist;
widgetRegistry.stockinfotable = StockInfoTable;
widgetRegistry.stockchart = StockChart;


export default widgetRegistry;