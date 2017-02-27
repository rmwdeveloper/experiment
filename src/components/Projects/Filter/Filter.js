import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Filter.css'; //eslint-disable-line

function Filter({stackList, selectFilter}) {

  return <div className={styles.root}>
    <h4 className={styles.title} >Filters:</h4>
    { stackList ? stackList.map( stack => {
      return <button className={styles.button} onClick={selectFilter} >{stack}</button>;
    }): null}
  </div>;
}

export default withStyles(styles)(Filter);
