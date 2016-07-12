import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './stockDashboard.css';

const title = 'Stock Dashboard';

class StockDashboard extends Component {
  static contextTypes = {
    setTitle: PropTypes.func.isRequired
  };
  render() {
    const { context } = this;

    context.setTitle(title);
    return <h2>Dashboard</h2>;
  }
}


export default withStyles(styles)(StockDashboard);
