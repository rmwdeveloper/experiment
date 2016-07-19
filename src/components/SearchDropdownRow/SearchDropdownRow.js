import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './SearchDropdownRow.css'; //eslint-disable-line


function SearchDropdownRow({searchResult}) {
  const { Symbol, Name, Exchange } = searchResult;
  console.log(searchResult);
  return (
    <li>
      <span>{symbol}</span>
      <span>{name}</span>
      <span>{exchange}</span>
    </li>
  );
}

export default withStyles(styles)(SearchDropdownRow);
