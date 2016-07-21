import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './ScrollableAddMenu.css'; //eslint-disable-line
import widgetRegistry from '../widgetRegistry';

function ScrollableAddMenu({ columnHeight, addStockWidget, cellIndex }) {
  return (
    <ul style={{minHeight: `${ columnHeight / 2}rem` }} className={styles.root}>
      {
        Object.keys(widgetRegistry).map((widgetType, index) => {
          return (
            <li
              key={index}
              onClick={() => { addStockWidget(widgetType, cellIndex); }}
              className="addBlock"
            >Make this block a {widgetType}
            </li>);
        })
      }
    </ul>
  );
}

ScrollableAddMenu.propTypes = {
  columnHeight: PropTypes.number,
  addStockWidget: PropTypes.func,
  cellIndex: PropTypes.string
};
export default withStyles(styles)(ScrollableAddMenu);
