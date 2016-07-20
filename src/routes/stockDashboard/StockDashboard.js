import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './stockDashboard.css';
import { connect } from 'react-redux';
import StockDashboardNavigation from '../../components/StockDashboardNavigation';
import * as stockActions from '../../actions/stock';
import * as layoutActions from '../../actions/layout';

import { DragDropContext as dragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import LayoutColumn from '../../components/LayoutColumn';
import widgetRegistry from '../../components/widgetRegistry';
import cx from 'classnames';
const title = 'Stock Dashboard';

@connect(state => ({
  watchedStocks: state.stock.watchedStocks,
  searchedStocks: state.stock.searchedStocks,
  mode: state.stock.mode,
  autosave: state.stock.autosave,
  widgets: state.stock.widgets,
  columns: state.layout.columns,
  cells: state.stock.cells,
  layout: state.layout.layout,
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
    columns: PropTypes.object,
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

  render() {
    const {
      searchStocks, toggleMode, mode, autosave, widgets, cells, layout, searches, swapWidgetPosition,
      first, last, handle, columns, watchStock, watchedStocks, quotes
    } = this.props;
    return (<div className={cx('row', 'center-lg center-md center-sm center-xs', styles.root)}>
      <StockDashboardNavigation toggleMode={toggleMode} mode={mode} autosave={autosave}/>
      <div className="row">
        {
          layout.map((column, index, array) => {

            return React.createElement(LayoutColumn,
              { className: columns[index].className, key: index },
              column.map((cell, index) => {
                return React.createElement(widgetRegistry[widgets[cell.widget].type], {
                  key: index,
                  swapWidgetPosition, cell, first, last, handle, searchStocks, searches, watchStock,
                  watchedStocks, quotes
                });
              })
            );
          })
        }
      </div>
    </div>);
  }
}

export default dragDropContext(HTML5Backend)(withStyles(styles)(StockDashboard))
