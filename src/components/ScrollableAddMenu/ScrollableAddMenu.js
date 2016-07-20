import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './ScrollableAddMenu.css'; //eslint-disable-line
import cx from 'classnames';
import widgetRegistry from '../widgetRegistry';
function ScrollableAddMenu({columnHeight}) {
  console.log(Object.keys(widgetRegistry));
  return (
      <div  style={{minHeight: `${ columnHeight / 2}rem` }} className={styles.root}>
        {
          Object.keys(widgetRegistry).map(widgetType => {
            return <span className="addBlock">Make this block a {widgetType}</span>;
          })
        }
      </div>
  );
}

export default withStyles(styles)(ScrollableAddMenu);
