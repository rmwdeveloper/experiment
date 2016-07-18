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
  mode: state.stock.mode
}), { ...stockActions })
class StockDashboard extends Component { //eslint-disable-line
  static propTypes = {
    children: PropTypes.element.isRequired,
    watchedStocks: PropTypes.array,
    loadStocks: PropTypes.func,
    searchStocks: PropTypes.func,
    toggleMode: PropTypes.func,
    mode: PropTypes.string
  };
  static contextTypes = {
    setTitle: PropTypes.func.isRequired
  };

  render() {
    const { searchStocks, toggleMode, mode } = this.props;
    return (<div>
      <StockDashboardNavigation toggleMode={toggleMode} mode={mode} />
      {
        React.Children.map(this.props.children, child => {
          return React.cloneElement(child, { searchStocks, mode });
        })
      }
    </div>);
  }
}


export default withStyles(styles)(StockDashboard);
