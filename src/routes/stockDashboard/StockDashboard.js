import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './stockDashboard.css';
import { connect } from 'react-redux';
import StockDashboardNavigation from '../../components/StockDashboardNavigation';
import * as stockActions from '../../actions/stock';
import * as layoutActions from '../../actions/layout';

import { DragDropContext as dragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import LayoutCell from '../../components/LayoutCell';
import widgetRegistry from '../../components/widgetRegistry';
import cx from 'classnames';
const title = 'Stock Dashboard';

@connect(state => ({
  watchedStocks: state.stock.watchedStocks,
  searchedStocks: state.stock.searchedStocks,
  mode: state.stock.mode,
  autosave: state.stock.autosave,
  widgets: state.stock.widgets,
  columnCount: state.layout.columnCount,
  rowCount: state.layout.rowCount,
  gridVisible: state.layout.gridVisible,
  cells: state.stock.cells,
  searches: state.stock.searches,
  quotes: state.stock.quotes,
  first: state.auth.first,
  last: state.auth.last,
  handle: state.auth.handle,
}), { ...stockActions, ...layoutActions })
class StockDashboard extends Component { //eslint-disable-line
  static propTypes = {
    watchedStocks: PropTypes.array,
    loadStocks: PropTypes.func,
    searchStocks: PropTypes.func,
    toggleMode: PropTypes.func,
    mode: PropTypes.string,
    autosave: PropTypes.bool,
    widgets: PropTypes.object,
    columnCount: PropTypes.number,
    rowCount: PropTypes.number,
    gridVisible: PropTypes.bool,
    cells: PropTypes.array,
    layout: PropTypes.array,
    searches: PropTypes.object,
    swapWidgetPosition: PropTypes.func,
    first: PropTypes.string,
    last: PropTypes.string,
    handle: PropTypes.string,
    watchStock: PropTypes.func,
    quotes: PropTypes.object
  };
  static contextTypes = {
    setTitle: PropTypes.func.isRequired
  };
  constructor() {
    super();
    this.renderLayout = this.renderLayout.bind(this);
  }
  renderLayout() {
    const { rowCount, columnCount, gridVisible} = this.props;
    const markup = [];
    for (let iterator = 0; iterator < columnCount; iterator++) {
      for (let nestediterator = 0; nestediterator < rowCount; nestediterator++) {
        markup.push(<LayoutCell gridVisible={gridVisible} key={nestediterator} />);
      }
    }
    return markup;
  }
  render() {
    const {
      searchStocks, toggleMode, mode, autosave, widgets, searches, swapWidgetPosition,
      first, last, handle, columnCount, rowCount, watchStock, watchedStocks, quotes
    } = this.props;
    const markup = this.renderLayout();
    return (<div className={cx('row', 'center-lg center-md center-sm center-xs', styles.root)}>
      <StockDashboardNavigation toggleMode={toggleMode} mode={mode} autosave={autosave}/>
      <div className="row">
        {markup}
      </div>
    </div>);
  }
}

export default dragDropContext(HTML5Backend)(withStyles(styles)(StockDashboard))
