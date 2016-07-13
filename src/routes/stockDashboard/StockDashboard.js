import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './stockDashboard.css';
import { connect } from 'react-redux';
import StockDashboardNavigation from '../../components/StockDashboardNavigation';
import * as stockActions from '../../actions/stock';

const title = 'Stock Dashboard';

@connect(state => ({
  watchedStocks: state.stock.watchedStocks
}), { ...stockActions })
class StockDashboard extends Component { //eslint-disable-line
  static propTypes = {
    children: PropTypes.element.isRequired,
    watchedStocks: PropTypes.array,
    loadStocks: PropTypes.func
  };
  static contextTypes = {
    setTitle: PropTypes.func.isRequired
  };
  componentWillMount() {
    // this.props.loadStocks();
  }
  render() {
    const { context } = this;
    context.setTitle(title);
    return (<div>
      <StockDashboardNavigation />
      {this.props.children}
    </div>);
  }
}


export default withStyles(styles)(StockDashboard);
