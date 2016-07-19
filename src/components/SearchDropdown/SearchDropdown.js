import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './SearchDropdown.css'; //eslint-disable-line
import SearchDropdownRow from '../SearchDropdownRow';

function SearchDropdown({ results }) {
  return (
    <div>
      {results.map((searchResult, index) => {
        return <SearchDropdownRow searchResult={searchResult} key={index} />
      })}
    </div>
  );
}

export default withStyles(styles)(SearchDropdown);
