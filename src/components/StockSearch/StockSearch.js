import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './StockSearch.css'; //eslint-disable-line
import SearchDropdown from '../SearchDropdown';
import cx from 'classnames';

class StockSearch extends Component {
  static propTypes = {
    searchStocks: PropTypes.func,
    className: PropTypes.string,
    searches: PropTypes.object,
    watchStock: PropTypes.func
  };

  constructor() {
    super();
    this.lookupStock = this.lookupStock.bind(this);
    this.search = this.search.bind(this);
    this.closeDropdown = this.closeDropdown.bind(this);
    this.openDropdown = this.openDropdown.bind(this);
    this.watchStock = this.watchStock.bind(this);

    this.state = {
      timeSinceLastInputChange: null,
      query: null,
      dropdownVisible: true
    };
  }

  lookupStock(event) {
    if (this.timeout) {
      clearInterval(this.timeout);
    }
    this.timeout = setInterval(this.search, 500, event.target.value);
  }

  search(query) {
    this.props.searchStocks(query);
    this.setState({ query });
    this.openDropdown();
    clearInterval(this.timeout);
  }

  openDropdown() {
    this.setState({ dropdownVisible: open });
  }

  closeDropdown() {
    this.setState({ dropdownVisible: false });
  }
  watchStock(stock) {
    this.closeDropdown();
    this.props.watchStock(stock);
  }
  render() {
    const { className, searches } = this.props;
    const { query, dropdownVisible } = this.state;

    return (
      <div className={cx(styles.root, className)}>
        <input
          onChange={this.lookupStock}
          type="search" placeholder="Search By Company Name or Ticker"
        />
        {
          searches[query] && dropdownVisible ? <SearchDropdown watchStock={this.watchStock} results={searches[query]} /> : null
        }
      </div>
    );
  }
}

export default withStyles(styles)(StockSearch);
