import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './StockInfoTable.css'; //eslint-disable-line

// todo: Refactor return statement
function StockInfoTable({ quotes }) {
  return (
    <table className={styles.root}>
      <colgroup span="4"></colgroup>
      <tr>
        <th>Name</th>
        <th>Symbol</th>
        <th>Price</th>
        <th>Change</th>
        <th>Change Percent</th>
        <th>MSDate</th>
        <th>Market Cap</th>
        <th>Volume</th>
        <th>Change YTD</th>
        <th>Change Percent YTD</th>
        <th>High</th>
        <th>Low</th>
        <th>Open</th>
      </tr>
      {
        Object.keys(quotes).map(quote => {
          return (<tr>
            <td>{quotes[quote].Name}</td>
            <td>{quotes[quote].Symbol}</td>
            <td>{quotes[quote].LastPrice}</td>
            <td style={{ color: parseFloat(quotes[quote].Change).toPrecision(2) > 0 ? 'green' : 'red' }}>
              {parseFloat(quotes[quote].Change).toPrecision(2)}</td>
            <td style={{ color: parseFloat(quotes[quote].ChangePercent).toPrecision(2) > 0 ? 'green' : 'red' }}>{parseFloat(quotes[quote].ChangePercent).toPrecision(2)}</td>
            <td>{parseFloat(quotes[quote].MSDate).toPrecision(7)}</td>
            <td>{quotes[quote].MarketCap}</td>
            <td>{quotes[quote].Volume}</td>
            <td>{quotes[quote].ChangeYTD}</td>
            <td style={{ color: parseFloat(quotes[quote].ChangePercentYTD).toPrecision(2) > 0 ? 'green' : 'red' }}>{parseFloat(quotes[quote].ChangePercentYTD).toPrecision(3)}</td>
            <td>{quotes[quote].High}</td>
            <td>{quotes[quote].Low}</td>
            <td>{quotes[quote].Open}</td>
          </tr>);
        })
      }
    </table>
  );
}

StockInfoTable.propTypes = {
  quotes: PropTypes.object
};
export default withStyles(styles)(StockInfoTable);
