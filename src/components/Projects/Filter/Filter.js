import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Filter.css'; //eslint-disable-line
import cx from 'classnames';

function Filter({stackList, selectFilter, selected}) {

  return <div className={styles.root}>
    <h4 className={styles.title} >Filters:</h4>
    { stackList ? stackList.map( (stack, index) => {
      return <button key={index} className={cx(styles.button, {[`${styles.selected}`] : selected === stack } )}
                     onClick={() => {selectFilter(stack);}} >{stack}</button>;
    }): null}
  </div>;
}

export default withStyles(styles)(Filter);
