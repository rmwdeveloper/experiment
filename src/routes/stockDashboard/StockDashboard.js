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
    this.putInBlock = this.putInBlock.bind(this);
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

  putInBlock(tallCell, otherCell) {
    const height = tallCell.rows + Number(tallCell.index[0]);
    const result = height > Number(otherCell.index[0]);
    if (result) {
      return true;
    } else if (!result) {
      return false;
    }
  }

  renderLayout() {
    const {
      rowCount, columnCount, gridVisible, cells, mode, layout, resizingLayoutIndex, boundingBox,
      resizingInProgress, startResize, resizingNeedsConfirm, markAsOverlapped, resizingDone,
      toggleEditCellMode, inEditMode, addStockWidget, swapWidget, resizingCell, resizeComplete
    } = this.props;

    let markup = [];
    const alreadyRendered = [];

    for (let cellIndex = 0; cellIndex < layout.length; cellIndex++) {
      if (alreadyRendered.includes(layout[cellIndex].index)) {
        continue;
      }
      const cell = layout[cellIndex];
      const className = `col-lg-${Math.floor(12 / (columnCount / cell.columns))} col-md-6 col-sm-12 col-xs-12`;
      const cellHeight = (cell.rows / rowCount ) * 100;
      if (cell.rows > 1) {
        const blockedElements = [];
        const restOfElements = [...layout.slice(0, cellIndex), ...layout.slice(cellIndex + 1)];

        for (let iterator = 0; iterator < restOfElements.length; iterator++) {
          if (this.putInBlock(layout[cellIndex], restOfElements[iterator])) {
            blockedElements.push(restOfElements[iterator]);
            alreadyRendered.push(restOfElements[iterator].index);
            if (markup.findIndex((item => { return item.key === restOfElements[iterator].index; })) !== -1) {
              const markupIndex = markup.findIndex((item => { return item.key === restOfElements[iterator].index; }));
              markup = [...markup.slice(0, markupIndex), ...markup.slice(markupIndex + 1)];
            }
          }
        }
        console.log(blockedElements);
        // console.log('two blocks of height.. ', cellHeight, 'needs to be made');
        // console.log('and it needs to have a classname of..', className);
        // console.log('the other block needs', 12 - Math.floor(12 / (columnCount / cell.columns)));
        // console.log('and it needs to contain the following elements');
      }
      markup.push(React.createElement(LayoutCell, {
        resizingCell, resizingInProgress, startResize,
        resizingNeedsConfirm, markAsOverlapped, cellHeight, resizingDone,
        resizeComplete, className, layoutIndices: cell.index, key: cell.index, resizingLayoutIndex, boundingBox
      }));
      // const layoutIndices = layout[cellIndex][0];
      //   let cellHeight = 100 / rowCount;
      //   let className = `col-lg-${Math.floor(12 / columnCount)} col-md-6 col-sm-12 col-xs-12`;
      //   if (layoutIndices.length > 1) {
      //     const cellColumns = Number(layoutIndices[1][1]) - Number(layoutIndices[0][1]) + 1 ;
      //     const cellRows = Number(layoutIndices[1][0]) - Number(layoutIndices[0][0]) + 1 ;
      //     cellHeight = (cellRows / rowCount ) * 100;
      //     const cellWidth = cellColumns / columnCount;
      //     className = `col-lg-${Math.floor(12 * cellWidth)} col-md-6 col-sm-12 col-xs-12`;
      //   }
      //   markup.push(React.createElement(LayoutCell, {resizingCell, resizingInProgress, startResize,
      //     resizingNeedsConfirm, markAsOverlapped, cellHeight, resizingDone,
      //     resizeComplete, className, layoutIndices, key: cellIndex, resizingLayoutIndex, boundingBox}));
      // }
    }
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
