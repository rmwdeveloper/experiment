import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './ScrollableAddMenu.css'; //eslint-disable-line
import cx from 'classnames';
import widgetRegistry from '../widgetRegistry';
function ScrollableAddMenu({columnHeight}) {
  console.log(Object.keys(widgetRegistry));
  return (
      <ul  style={{minHeight: `${ columnHeight / 2}rem` }} className={styles.root}>
        {
          Object.keys(widgetRegistry).map(widgetType => {
            return <li className="addBlock">Make this block a {widgetType}</li>;
          })
        }
      </ul>
  );
}

export default withStyles(styles)(ScrollableAddMenu);
