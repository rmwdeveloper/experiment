import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './stockDashboard.css';
import { connect } from 'react-redux';
import StockDashboardNavigation from '../../components/StockDashboardNavigation';
import * as stockActions from '../../actions/stock';

const title = 'Stock Dashboard';

@connect(state => ({
  watchedStocks: state.stock.watchedStocks,
  searchedStocks: state.stock.searchedStocks,
  mode: state.stock.mode,
  autosave: state.stock.autosave,
  widgets: state.stock.widgets,
  columns: state.stock.columns,
  cells: state.stock.cells,
  layout: state.stock.layout,
  first: state.auth.first,
  last: state.auth.last,
  handle: state.auth.handle,
}), { ...stockActions })
class StockDashboard extends Component { //eslint-disable-line
  static propTypes = {
    children: PropTypes.element.isRequired,
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
    swapWidgetPosition: PropTypes.func,
    first: PropTypes.string,
    last: PropTypes.string,
    handle: PropTypes.string
  };
  static contextTypes = {
    setTitle: PropTypes.func.isRequired
  };

  render() {
    const { searchStocks, toggleMode, mode, autosave, widgets, cells, layout, swapWidgetPosition,
      first, last, handle, columns } = this.props;
    return (<div>
      <StockDashboardNavigation toggleMode={toggleMode} mode={mode} autosave={autosave} />
      {
        React.Children.map(this.props.children, child => {
          return React.cloneElement(child, { searchStocks, mode, first, last, handle, columns,
            autosave, widgets, cells, layout, swapWidgetPosition });
        })
      }
    </div>);
  }
}


export default withStyles(styles)(StockDashboard);
