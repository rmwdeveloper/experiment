import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './SearchDropdown.css'; //eslint-disable-line
import SearchDropdownRow from '../SearchDropdownRow';

function SearchDropdown({ results, watchStock }) {
  return (
    <div className={styles.root}>
      <ol>
        {results.map((searchResult, index) => {
          return <SearchDropdownRow watchStock={watchStock} searchResult={searchResult} key={index}/>
        })}
      </ol>
    </div>
  );
}

SearchDropdown.propTypes = {
  watchStock: PropTypes.func,
  results: PropTypes.array
};
export default withStyles(styles)(SearchDropdown);
