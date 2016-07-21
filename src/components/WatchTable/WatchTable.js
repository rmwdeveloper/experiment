import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './WatchTable.css'; //eslint-disable-line
import cx from 'classnames';
import StockTableRow from '../StockTableRow';
function WatchTable({ className, watchedStocks, quotes, changeDisplayedChart }) {
  return (
    <div className={cx(styles.root, className)}>
      <table id={styles.watch}>
        <thead>
          <tr>
            <th>
              <a id={styles.sortSymbol}>Symbol</a>
            </th>
            <th>
              <a id={styles.sortPrice}>Price</a>
            </th>
          </tr>
        </thead>
        <tbody>
        {
          watchedStocks.length ? watchedStocks.map((stock, index) => { // eslint-disable-line
            if (quotes[stock.Symbol]) {
              return (
                <StockTableRow
                  changeDisplayedChart={changeDisplayedChart}
                  key={index} stock={stock}
                  quote={quotes[stock.Symbol]}
                />
              );
            }
          }) : null
        }
        </tbody>
      </table>
    </div>
  );
}

WatchTable.propTypes = {
  className: PropTypes.string,
  quotes: PropTypes.object,
  watchedStocks: PropTypes.array,
  changeDisplayedChart: PropTypes.func
};
export default withStyles(styles)(WatchTable);
