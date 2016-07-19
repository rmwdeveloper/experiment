import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './StockSearch.css'; //eslint-disable-line
import cx from 'classnames';

class StockSearch extends Component {
  static propTypes = {
    searchStocks: PropTypes.func,
    className: PropTypes.string
  };

  constructor() {
    super();
    this.lookupStock = this.lookupStock.bind(this);
    this.state = {
      timeSinceLastInputChange: null
    };
  }

  lookupStock() {
    const now = Date.now();

    if ((now - this.state.timeSinceLastInputChange) > 2000) {
      this.props.searchStocks(event.target.value);
    }

    this.setState({ timeSinceLastInputChange: now });
  }

  render() {
    const { className } = this.props;
    return (
      <div className={cx(styles.root, className)}>
        <input onChange={this.lookupStock} type="search" placeholder="Search By Company Name or Ticker"/>
      </div>
    );
  }
}

export default withStyles(styles)(StockSearch);
