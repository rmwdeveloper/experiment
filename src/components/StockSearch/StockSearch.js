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
    this.search = this.search.bind(this);
    this.state = {
      timeSinceLastInputChange: null
    };
  }

  lookupStock(event) {
    if (this.timeout) {
      clearInterval(this.timeout);
    }
    this.timeout = setInterval(this.search, 1000, event.target.value);
  }

  search(query) {
    this.props.searchStocks(event.target.value);
    clearInterval(this.timeout);
  }

  render() {
    const { className } = this.props;
    return (
      <div className={cx(styles.root, className)}>
        <input
          onChange={this.lookupStock}
          type="search" placeholder="Search By Company Name or Ticker" />
      </div>
    );
  }
}

export default withStyles(styles)(StockSearch);
