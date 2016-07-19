import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './SearchDropdownRow.css'; //eslint-disable-line


function SearchDropdownRow({searchResult}) {
  const { Symbol, Name, Exchange } = searchResult;
  console.log(searchResult);
  return (
    <li>
      <span>{Symbol}</span>
      <span>{Name}</span>
      <span>{Exchange}</span>
    </li>
  );
}

export default withStyles(styles)(SearchDropdownRow);
