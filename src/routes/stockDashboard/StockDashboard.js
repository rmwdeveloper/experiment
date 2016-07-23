import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './stockDashboard.css'; //eslint-disable-line
import { connect } from 'react-redux';
import StockDashboardNavigation from '../../components/StockDashboardNavigation';
import * as stockActions from '../../actions/stock';
import * as layoutActions from '../../actions/layout';

import { DragDropContext as dragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import LayoutCell from '../../components/LayoutCell';
import Modal from '../../components/Modal';


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
  layout: state.layout.layout,
  searches: state.stock.searches,
  quotes: state.stock.quotes,
  first: state.auth.first,
  last: state.auth.last,
  handle: state.auth.handle,
  charts: state.stock.charts,
  displayedChart: state.stock.displayedChart,
  inEditMode: state.stock.inEditMode,
  resizingLayoutIndex: state.layout.resizingLayoutIndex,
  boundingBox: state.layout.boundingBox,
  resizingInProgress: state.layout.resizingInProgress,
  resizingNeedsConfirm: state.layout.resizingNeedsConfirm
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
    changeDisplayedChart: PropTypes.func,
    swapWidget: PropTypes.func,
    resizingCell: PropTypes.func,
    resizingLayoutIndex: PropTypes.string,
    boundingBox: PropTypes.object,
    resizeComplete: PropTypes.func,
    startResize: PropTypes.func,
    resizingInProgress: PropTypes.bool,
    resizingNeedsConfirm: PropTypes.bool
  };
  static contextTypes = {
    setTitle: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.renderLayout = this.renderLayout.bind(this);
    this.getOppositeIndex = this.getOppositeIndex.bind(this);
  }
  getOppositeIndex(layoutDataStructure) {
    console.log(layoutDataStructure);
  }
  renderLayout() {
    const { rowCount, columnCount, gridVisible, cells, mode, layout, resizingLayoutIndex, boundingBox,
      resizingInProgress, startResize,
      toggleEditCellMode, inEditMode, addStockWidget, swapWidget, resizingCell, resizeComplete } = this.props;
    const markup = [];
    let columnRendering = 0;
    for (let cellIndex = 0; cellIndex < layout.length; cellIndex++) {
      const layoutIndices = layout[cellIndex][0];
      const className = `col-lg-${12 / columnCount} col-md-6 col-sm-12 col-xs-12`;
      markup.push(React.createElement(LayoutCell, {resizingCell, resizingInProgress, startResize,
        resizeComplete, className, layoutIndices, key: cellIndex, resizingLayoutIndex, boundingBox}));
    }
    return markup;
  }

  render() {
    const { toggleGrid, gridVisible, addColumn, addRow, toggleMode, mode, autosave, resizingNeedsConfirm } = this.props;
    this.context.setTitle(title);
    const markup = this.renderLayout();
    if (resizingNeedsConfirm) {

    }
    return (
      <div
        className={cx('row',
      'center-lg center-md center-sm center-xs top-lg top-md top-sm top-xs',
        styles.root)}
      >
        <StockDashboardNavigation
          toggleGrid={toggleGrid}
          gridVisible={gridVisible}
          addColumn={addColumn}
          addRow={addRow}
          toggleMode={toggleMode}
          mode={mode}
          autosave={autosave}
        />
        <div id="stockDashboard" className={cx('col-lg-12 col-md-12 col-sm-12 col-xs-12', styles.primaryColumn)}>
          <div className={cx(styles.primaryRow, 'row')}>
            {markup}
          </div>
        </div>
        <Modal id="primaryModal" modalContent="Hello World!" />
      </div>)
      ;
  }
}

export default dragDropContext(HTML5Backend)(withStyles(styles)(StockDashboard));
