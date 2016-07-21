import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './stockDashboard.css';
import { connect } from 'react-redux';
import StockDashboardNavigation from '../../components/StockDashboardNavigation';
import * as stockActions from '../../actions/stock';
import * as layoutActions from '../../actions/layout';

import { DragDropContext as dragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import LayoutRow from '../../components/LayoutRow';
import LayoutColumn from '../../components/LayoutColumn';
import widgetRegistry from '../../components/widgetRegistry';
import cx from 'classnames';
const title = 'Stock Dashboard';

@connect(state => ({
  watchedStocks: state.stock.watchedStocks,
  searchedStocks: state.stock.searchedStocks,
  mode: state.stock.mode,
  autosave: state.stock.autosave,
  columnCount: state.layout.columnCount,
  rowCount: state.layout.rowCount,
  gridVisible: state.layout.gridVisible,
  cells: state.layout.cells,
  searches: state.stock.searches,
  quotes: state.stock.quotes,
  first: state.auth.first,
  last: state.auth.last,
  handle: state.auth.handle,
  charts: state.stock.charts,
  displayedChart: state.stock.displayedChart,
  inEditMode: state.stock.inEditMode
}), { ...stockActions, ...layoutActions })
class StockDashboard extends Component { //eslint-disable-line
  static propTypes = {
    watchedStocks: PropTypes.array,
    loadStocks: PropTypes.func,
    searchStocks: PropTypes.func,
    toggleMode: PropTypes.func,
    mode: PropTypes.string,
    autosave: PropTypes.bool,
    columnCount: PropTypes.number,
    rowCount: PropTypes.number,
    gridVisible: PropTypes.bool,
    cells: PropTypes.object,
    layout: PropTypes.array,
    searches: PropTypes.object,
    swapWidgetPosition: PropTypes.func,
    first: PropTypes.string,
    last: PropTypes.string,
    handle: PropTypes.string,
    watchStock: PropTypes.func,
    quotes: PropTypes.object,
    addRow: PropTypes.func,
    addColumn: PropTypes.func,
    toggleGrid: PropTypes.func,
    toggleEditCellMode: PropTypes.func,
    inEditMode: PropTypes.array,
    addStockWidget: PropTypes.func,
    charts: PropTypes.object,
    getChart: PropTypes.func,
    displayedChart: PropTypes.string,
    changeDisplayedChart: PropTypes.func
  };
  static contextTypes = {
    setTitle: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.renderLayout = this.renderLayout.bind(this);
  }

  renderLayout() {
    const { rowCount, columnCount, gridVisible, cells, mode, toggleEditCellMode, inEditMode, addStockWidget, swapWidget } = this.props;
    let column = [];
    let widget = null;
    const markup = [];
    for (let iterator = 0; iterator < columnCount; iterator++) {
      column = [];
      for (let nestediterator = 0; nestediterator < rowCount; nestediterator++) {
        widget = null;
        if (cells.hasOwnProperty(`${iterator}${nestediterator}`) && cells[`${iterator}${nestediterator}`] ) {
          const { widgetType } = cells[`${iterator}${nestediterator}`];
          widget = widgetRegistry[widgetType];
        }
        column.push(React.createElement(LayoutRow, {
          gridVisible, widget, propsObj: this.props, mode,
          editing: inEditMode.includes(`${iterator}${nestediterator}`), addStockWidget, swapWidget,
          rowWidth: Math.floor(100 / columnCount), toggleEditCellMode, cellIndex: `${iterator}${nestediterator}`,
          key: `${iterator}${nestediterator}`, columnHeight: Math.floor(100 / rowCount)
        }));
      }
      markup.push(React.createElement(LayoutColumn, {
        key: iterator, classNumber: Math.floor(12 / columnCount)
      }, column));
    }
    return markup;
  }

  render() {
    const {
      searchStocks, toggleMode, mode, autosave, widgets, searches, swapWidgetPosition, toggleGrid, gridVisible,
      first, last, handle, columnCount, rowCount, watchStock, watchedStocks, quotes, addColumn, addRow
    } = this.props;
    const markup = this.renderLayout();
    return (
      <div className={cx('row', 'center-lg center-md center-sm center-xs top-lg top-md top-sm top-xs', styles.root)}>
        <StockDashboardNavigation toggleGrid={toggleGrid} gridVisible={gridVisible}
                                  addColumn={addColumn} addRow={addRow} toggleMode={toggleMode} mode={mode}
                                  autosave={autosave}/>
        <div className={cx("col-lg-12 col-md-12 col-sm-12 col-xs-12", styles.primaryColumn)}>
          <div className={cx(styles.primaryRow, "row")}>
            {markup}
          </div>
        </div>
      </div>)
      ;
  }
}

export default dragDropContext(HTML5Backend)(withStyles(styles)(StockDashboard))
