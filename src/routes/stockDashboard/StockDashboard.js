import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './stockDashboard.css';
import StockDashboardNavigation from '../../components/StockDashboardNavigation';

const title = 'Stock Dashboard';

class StockDashboard extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  };
  static contextTypes = {
    setTitle: PropTypes.func.isRequired
  };
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
