import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './stockDashboard.css';
import { connect } from 'react-redux';
import StockDashboardNavigation from '../../components/StockDashboardNavigation';

const title = 'Stock Dashboard';

@connect(state => ({
  watchedStocks: state.stock.stockDashboard
}))
class StockDashboard extends Component { //eslint-disable-line
  static propTypes = {
    children: PropTypes.element.isRequired,
    watchedStocks: PropTypes.list
  };
  static contextTypes = {
    setTitle: PropTypes.func.isRequired
  };
  render() {
    const { context } = this;
    context.setTitle(title);
    console.log(this.props.watchedStocks);
    return (<div>
      <StockDashboardNavigation />
      {this.props.children}
    </div>);
  }
}


export default withStyles(styles)(StockDashboard);
