import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './WatchList.css'; //eslint-disable-line
import StockSearch from '../StockSearch';
import WatchTable from '../WatchTable';
import cx from 'classnames';

function WatchList({ searchStocks, searches }) {
  return (
    <div className={cx(styles.root, 'row')}>
      <StockSearch searches={searches} searchStocks={searchStocks} className="col-lg-12 col-md-12 col-sm-12 col-xs-12"/>
      <WatchTable className="col-lg-12 col-md-12 col-sm-12 col-xs-12"/>
    </div>
  );
}

WatchList.propTypes = {
  searchStocks: PropTypes.func,
  searches: PropTypes.object
};
export default withStyles(styles)(WatchList);
