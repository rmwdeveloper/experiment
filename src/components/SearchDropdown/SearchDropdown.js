import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './SearchDropdown.css'; //eslint-disable-line
import SearchDropdownRow from '../SearchDropdownRow';

function SearchDropdown({ results }) {
  return (
    <ol className={styles.root}>
      {results.map((searchResult, index) => {
        return <SearchDropdownRow searchResult={searchResult} key={index} />
      })}
    </ol>
  );
}

export default withStyles(styles)(SearchDropdown);
