import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './stockDashboard.css'; //eslint-disable-line
import { connect } from 'react-redux';
import shallowCompare from 'react-addons-shallow-compare';
import StockDashboardNavigation from '../../components/StockDashboardNavigation';
import * as stockActions from '../../actions/stock';
import * as layoutActions from '../../actions/layout';
import * as modalActions from '../../actions/modal';

import { DragDropContext as dragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import LayoutCell from '../../components/LayoutCell';
import LayoutBlock from '../../components/LayoutBlock';
import Modal from '../../components/Modal';
import ModalButton from '../../components/ModalButton';


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
  resizingNeedsConfirm: state.layout.resizingNeedsConfirm,
  resizingDone: state.layout.resizingDone,
  modalBody: state.modal.modalBody,
  modalFooter: state.modal.modalFooter,
  modalVisible: state.modal.modalVisible
}), { ...stockActions, ...layoutActions, ...modalActions })
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
    resizingNeedsConfirm: PropTypes.bool,
    resizingDone: PropTypes.bool,
    modalVisible: PropTypes.bool,
    openModal: PropTypes.func,
    closeModal: PropTypes.func,
    modalBody: PropTypes.string,
    modalFooter: PropTypes.element,
    deactivateMergeConfirm: PropTypes.func,
    mergeCells: PropTypes.func,
    markAsOverlapped: PropTypes.func
  };
  static contextTypes = {
    setTitle: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.renderLayout = this.renderLayout.bind(this);
    // this.putInBlock = this.putInBlock.bind(this);
    this.getCellsInSameRowsFilter = this.getCellsInSameRowsFilter.bind(this);
    this.renderBlocks = this.renderBlocks.bind(this);
    this.deduplicateCellsFilter = this.deduplicateCellsFilter.bind(this);
    this.getGroupedColumnCount = this.getGroupedColumnCount.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.resizingNeedsConfirm) {
      this.props.deactivateMergeConfirm();
      const footer = (
        <div>
          <ModalButton closeModal={this.props.closeModal} text="Cancel"/>
          <ModalButton closeModal={this.props.closeModal} text="Confirm" clickFunction={this.props.mergeCells}/>
        </div>);
      this.props.openModal('Merge these cells?', footer);
    }
  }

  shouldComponentUpdate(nextProps) {
    return shallowCompare(this.props, nextProps);
  }
  deduplicateCellsFilter(alreadyRendered, value) {
    return !alreadyRendered.includes(value.props.layoutIndices);
  }
  getCellsInSameRowsFilter(rowStart, rowEnd, value) {
    return (rowStart <= Number(value.index[0])) && (Number(value.index[0]) < rowEnd);
  }
  getGroupedColumnCount(cells, columnIndex) {
    let counter = 0;
    for (let iterator = 0; iterator < cells.length; iterator++) {
      if (columnIndex === cells[iterator].index[1]) {
        counter++;
      }
    }
    return counter;
  }
  renderBlocks(blockedElements, className){
    const elements = [];
    for (const columnIndex in blockedElements) { //eslint-disable-line
      if (blockedElements.hasOwnProperty(columnIndex)) {
        elements.push(React.createElement(LayoutBlock, {key: columnIndex, className}, blockedElements[columnIndex]));
      }
    }
    return elements;
  }

  renderLayout() {
    const {
      rowCount, columnCount, gridVisible, cells, mode, layout, resizingLayoutIndex, boundingBox,
      resizingInProgress, startResize, resizingNeedsConfirm, markAsOverlapped, resizingDone,
      toggleEditCellMode, inEditMode, addStockWidget, swapWidget, resizingCell, resizeComplete
    } = this.props;

    let markup = [];
    const layoutCells = [];
    const alreadyRendered = [];

    for (let cellIndex = 0; cellIndex < layout.length; cellIndex++) { // For every cell
      if (alreadyRendered.includes(layout[cellIndex].index)) { // todo: probably shouldn't need this. Don't
        continue;                                              // render extraneously
      }
      const cell = layout[cellIndex];
      const className = `col-lg-${Math.floor(12 / (columnCount / cell.columns))} col-md-6 col-sm-12 col-xs-12`;
      const cellHeight = (cell.rows / rowCount) * 100;
      if (cell.rows > 1) {
        const restOfElements = [...layout.slice(0, cellIndex), ...layout.slice(cellIndex + 1)];
        const cellRowRange = (Number(cell.index[0]) + cell.rows);
        const sameLevelCells = restOfElements.filter(this.getCellsInSameRowsFilter.bind(null, Number(cell.index[0]), cellRowRange));
        alreadyRendered.push(...sameLevelCells.map((item) => {
          return item.index;
        }));

        const cellsGroupedByColumn = {};
        for (let iterator = 0; iterator < sameLevelCells.length; iterator++) {
          if (cellsGroupedByColumn.hasOwnProperty(sameLevelCells[iterator].index[1])) {
            cellsGroupedByColumn[sameLevelCells[iterator].index[1]].push(
              React.createElement(LayoutCell, {
                  resizingCell, resizingInProgress, startResize,
                  resizingNeedsConfirm, markAsOverlapped, cellHeight: (100 / this.getGroupedColumnCount(sameLevelCells, sameLevelCells[iterator].index[1])), resizingDone,
                  resizeComplete, className: "col-xs-12", layoutIndices: sameLevelCells[iterator].index, key: sameLevelCells[iterator].index, resizingLayoutIndex, boundingBox
                }));
          } else {
            cellsGroupedByColumn[sameLevelCells[iterator].index[1]] = [];
            cellsGroupedByColumn[sameLevelCells[iterator].index[1]].push(

              React.createElement(LayoutCell, {
                  resizingCell, resizingInProgress, startResize,
                  resizingNeedsConfirm, markAsOverlapped, cellHeight: (100 / this.getGroupedColumnCount(sameLevelCells, sameLevelCells[iterator].index[1])), resizingDone,
                  resizeComplete, className: "col-xs-12", layoutIndices: sameLevelCells[iterator].index, key: sameLevelCells[iterator].index, resizingLayoutIndex, boundingBox
                }));
          }
        }
        layoutCells.push(...this.renderBlocks(cellsGroupedByColumn, className));

      }
      layoutCells.push(React.createElement(LayoutCell, {
        resizingCell, resizingInProgress, startResize,
        resizingNeedsConfirm, markAsOverlapped, cellHeight, resizingDone,
        resizeComplete, className, layoutIndices: cell.index, key: cell.index, resizingLayoutIndex, boundingBox
       }));

    }

    const uniqueCells = layoutCells.filter(this.deduplicateCellsFilter.bind(null, alreadyRendered));
    return uniqueCells.sort((cellA, cellB) => {
      return Number(cellA.key) - Number(cellB.key);
    });
    return markup;
  }

  render() {
    const {
      toggleGrid, gridVisible, addColumn, addRow, toggleMode, mode, autosave, resizingNeedsConfirm,
      closeModal, modalVisible, modalBody, modalFooter
    } = this.props;
    this.context.setTitle(title);
    const markup = this.renderLayout();
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
        <Modal id="primaryModal" modalVisible={modalVisible} modalTitle="The title!" modalFooter={modalFooter}
               modalContent={modalBody}/>
      </div>)
      ;
  }
}

export default dragDropContext(HTML5Backend)(withStyles(styles)(StockDashboard));
