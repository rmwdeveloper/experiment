import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './SearchDropdown.css'; //eslint-disable-line
import SearchDropdownRow from '../SearchDropdownRow';

function SearchDropdown({ results, closeDropdown }) {
  return (
    <div className={styles.root}>
      <ol>
        {results.map((searchResult, index) => {
          return <SearchDropdownRow closeDropdown={closeDropdown} searchResult={searchResult} key={index} />
        })}
      </ol>
    </div>
  );
}

export default withStyles(styles)(SearchDropdown);
