import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './StockTableRow.css'; //eslint-disable-line


function StockTableRow({ stock, quote, changeDisplayedChart }) {
  const { Name, Symbol } = stock;
  const { LastPrice, Change, ChangePercentYTD } = quote;
  return (
    <tr
      onClick={() => { changeDisplayedChart(Symbol); }}
      className={styles.root} data-ticker={Symbol}
    >
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
          <font color="#008800">{Math.abs(parseFloat(ChangePercentYTD).toPrecision(2))}</font>
          <font color="#008800">({parseFloat(Change).toPrecision(2)})</font>
        </span>
      </td>
    </tr>
  );
}

StockTableRow.propTypes = {
  stock: PropTypes.object,
  quote: PropTypes.object,
  changeDisplayedChart: PropTypes
};
export default withStyles(styles)(StockTableRow);
