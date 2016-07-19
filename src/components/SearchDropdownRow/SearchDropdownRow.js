import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './SearchDropdownRow.css'; //eslint-disable-line


function SearchDropdownRow({searchResult}) {
  const { Symbol, Name, Exchange } = searchResult;
  console.log(searchResult);
  return (
    <li className={styles.root}>
      <span className={styles.symbol}>{Symbol}</span>
      <span className={styles.name}>{Name}</span>
      <span className={styles.exchange}>{Exchange}</span>
    </li>
  );
}

export default withStyles(styles)(SearchDropdownRow);
