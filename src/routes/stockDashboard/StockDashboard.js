import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './stockDashboard.css'; //eslint-disable-line
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import shallowCompare from 'react-addons-shallow-compare';
import StockDashboardNavigation from '../../components/Stocks/StockDashboardNavigation';
import * as stockActions from '../../actions/stock';
import * as layoutActions from '../../actions/layout';
import * as modalActions from '../../actions/modal';

import { DragDropContext as dragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';


import cx from 'classnames';
const title = 'Stock Dashboard';

@connect(state => ({
  watchedStocks: state.stock.watchedStocks,
  searchedStocks: state.stock.searchedStocks,
  mode: state.stock.mode,
  autosave: state.stock.autosave,
  searches: state.stock.searches,
  quotes: state.stock.quotes,
  first: state.auth.first,
  last: state.auth.last,
  handle: state.auth.handle,
  charts: state.stock.charts,
  displayedChart: state.stock.displayedChart,
  inEditMode: state.stock.inEditMode,
  gridVisible: state.layout.gridVisible,
  layout: state.layout.layout,
  modalBody: state.modal.modalBody,
  modalFooter: state.modal.modalFooter,
  modalVisible: state.modal.modalVisible,
  layoutPickerVisible: state.layout.layoutPickerVisible
  // columnCount: state.layout.columnCount,
  // rowCount: state.layout.rowCount,
  // cells: state.layout.cells,
  // resizingLayoutIndex: state.layout.resizingLayoutIndex,
  // boundingBox: state.layout.boundingBox,
  // resizingInProgress: state.layout.resizingInProgress,
  // resizingNeedsConfirm: state.layout.resizingNeedsConfirm,
  // resizingDone: state.layout.resizingDone,
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
    modalVisible: PropTypes.bool,
    openModal: PropTypes.func,
    closeModal: PropTypes.func,
    modalBody: PropTypes.string,
    modalFooter: PropTypes.element,
    toggleLayoutPicker: PropTypes.func,
    layoutPickerVisible: PropTypes.bool,
    deactivateMergeConfirm: PropTypes.func
    // resizingCell: PropTypes.func,
    // resizingLayoutIndex: PropTypes.string,
    // boundingBox: PropTypes.object,
    // resizeComplete: PropTypes.func,
    // startResize: PropTypes.func,
    // resizingInProgress: PropTypes.bool,
    // resizingNeedsConfirm: PropTypes.bool,
    // resizingDone: PropTypes.bool,
    // deactivateMergeConfirm: PropTypes.func,
    // mergeCells: PropTypes.func,
    // markAsOverlapped: PropTypes.func

  };
  static contextTypes = {
    setTitle: PropTypes.func.isRequired
  };

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


  render() {
    const {
      toggleGrid, gridVisible, toggleMode, mode, autosave, layoutPickerVisible,
      modalVisible, modalBody, modalFooter, toggleLayoutPicker
    } = this.props;
    this.context.setTitle(title);
    return (
      <div className={cx('row', 'center-lg center-md center-sm center-xs top-lg top-md top-sm top-xs', styles.root)}>
        <StockDashboardNavigation
          toggleLayoutPicker={toggleLayoutPicker}
          toggleGrid={toggleGrid}
          gridVisible={gridVisible}
          toggleMode={toggleMode}
          mode={mode}
          autosave={autosave}
        />

        <div id="stockDashboard" className={cx('col-lg-12 col-md-12 col-sm-12 col-xs-12', styles.primaryColumn)}>
          <div className={cx('col-lg-12 col-md-12 col-sm-12 col-xs-12', styles.primaryColumn)}>
            <div className={cx(styles.primaryRow, 'row')}>
              {markup}
            </div>


            <ReactCSSTransitionGroup transitionName={{
          enter: styles.exampleEnter, enterActive: styles.exampleEnterActive,
          leave: styles.exampleLeave, exampleLeaveActive: styles.exampleLeaveActive
        }} transitionEnterTimeout={600} transitionLeaveTimeout={600}>
              { layoutPickerVisible ?
                <LayoutPicker className={styles.layoutPicker}/> : null }
            </ReactCSSTransitionGroup>
            <div id="stockDashboard" className={cx('col-lg-12 col-md-12 col-sm-12 col-xs-12', styles.primaryColumn)}>


            </div>
            <Modal id="primaryModal" modalVisible={modalVisible} modalTitle="The title!" modalFooter={modalFooter}
                   modalContent={modalBody}/>
          </div>
        </div>
      </div>);
  }
}

export default dragDropContext(HTML5Backend)(withStyles(styles)(StockDashboard));
