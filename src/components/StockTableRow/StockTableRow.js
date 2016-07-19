import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './StockTableRow.css'; //eslint-disable-line
import cx from 'classnames';

function StockTableRow({ stock, quote }) {
  const { Name, Symbol } = stock;
  const { LastPrice, Change, ChangePercentYTD } = quote;
  return (
    <tr className={styles.root} data-ticker={Symbol}>
      <td className={styles.tickerColumn}>
        <span className={styles.symbol}>
          <a href="#">{Symbol}</a>
        </span>
        <br />
        <span className={styles.company}>{Name}</span>
      </td>
      <td className={styles.priceColumn}>
        <span className={styles.price}>{LastPrice}</span>
        <br />
        <span className={styles.change}>
          <font color="#008800">{Change}</font>
          <font color="#008800">{ChangePercentYTD}</font>
        </span>
      </td>
    </tr>
  );
}

StockTableRow.propTypes = {
  stock: PropTypes.object,
  quote: PropTypes.object
};
export default withStyles(styles)(StockTableRow);
