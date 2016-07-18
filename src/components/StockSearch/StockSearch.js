import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './StockSearch.css'; //eslint-disable-line
import cx from 'classnames';

class StockSearch extends Component {
  static propTypes = {
    searchStocks: PropTypes.func
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
    return (
      <div className={cx(styles.root, 'row center-lg center-md center-sm center-xs')}>
        <div className="col-lg">
          <input onChange={this.lookupStock} type="search" placeholder="Search By Company Name or Ticker" />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(StockSearch);
