import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './CellActions.css'; //eslint-disable-line
import cx from 'classnames';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import ScrollableAddMenu from '../ScrollableAddMenu';
function CellActions({rowWidth, columnHeight, toggleEditCellMode, cellIndex, editing}) {
  return (
    <div className={styles.root}>
      {
        editing ?

            <ScrollableAddMenu columnHeight={columnHeight} key={cellIndex} />

          :
          <i onClick={() => {toggleEditCellMode(cellIndex)}}
             style={{ fontSize: `${rowWidth * (columnHeight * 2) / 100}rem`}}
             className={cx(styles.addWidget, "fa fa-plus")}/>
      }
    </div>
  );
}

export default withStyles(styles)(CellActions);
