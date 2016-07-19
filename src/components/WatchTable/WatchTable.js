import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './WatchTable.css'; //eslint-disable-line
import cx from 'classnames';

function WatchTable({ className, watchedStocks }) {
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
          watchedStocks.length ? watchedStocks.map((stock, index) => {
            return <StockTableRow />
          }) : null
        }
        </tbody>
      </table>
    </div>
  );
}

WatchTable.propTypes = {
  className: PropTypes.string
};
export default withStyles(styles)(WatchTable);
