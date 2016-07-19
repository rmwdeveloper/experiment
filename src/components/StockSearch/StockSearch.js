import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './StockSearch.css'; //eslint-disable-line
import cx from 'classnames';

class StockSearch extends Component {
  static propTypes = {
    searchStocks: PropTypes.func,
    className: PropTypes.string,
    searches: PropTypes.object
  };

  constructor() {
    super();
    this.lookupStock = this.lookupStock.bind(this);
    this.search = this.search.bind(this);
    this.state = {
      timeSinceLastInputChange: null,
      query: null
    };
  }

  lookupStock(event) {
    if (this.timeout) {
      clearInterval(this.timeout);
    }
    this.timeout = setInterval(this.search, 1000, event.target.value);
  }

  search(query) {
    this.props.searchStocks(query);
    this.setState({query});
    clearInterval(this.timeout);
  }

  render() {
    const { className, searches } = this.props;
    const { query } = this.state;
    if (query) {
      console.log(searches);
    }
    return (
      <div className={cx(styles.root, className)}>
        <input
          onChange={this.lookupStock}
          type="search" placeholder="Search By Company Name or Ticker"
        />
        <div className={styles.searchResults}>

        </div>
      </div>
    );
  }
}

export default withStyles(styles)(StockSearch);
