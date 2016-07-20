import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './StockInfoTable.css'; //eslint-disable-line


function StockInfoTable({quotes}) {
  console.log(quotes);
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
        <th>ChangeYTD</th>
        <th>ChangePercentYTD</th>
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
            <td>{quotes[quote].Change}</td>
            <td>{quotes[quote].ChangePercent}</td>
            <td>{quotes[quote].MSDate}</td>
            <td>{quotes[quote].MarketCap}</td>
            <td>{quotes[quote].Volume}</td>
            <td>{quotes[quote].ChangeYTD}</td>
            <td>{quotes[quote].ChangePercentYTD}</td>
            <td>{quotes[quote].High}</td>
            <td>{quotes[quote].Low}</td>
            <td>{quotes[quote].Open}</td>
          </tr>);
        })
      }
    </table>
  );
}

export default withStyles(styles)(StockInfoTable);
