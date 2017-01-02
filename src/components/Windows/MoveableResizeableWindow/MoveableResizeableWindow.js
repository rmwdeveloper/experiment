import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './MoveableResizeableWindow.css'; //eslint-disable-line
import { windowsClickables } from '../../../constants/windows';

class MoveableResizeableWindow extends Component {
    static propTypes = {
      index: PropTypes.number,
      minimized: PropTypes.bool,
      maximized: PropTypes.bool,
      height: PropTypes.number,
      width: PropTypes.number,
      xPosition: PropTypes.number,
      yPosition: PropTypes.number,
      children: PropTypes.array
    };
    render() {
      const { index, minimized, maximized, height, width, xPosition, yPosition, children } = this.props;

      let windowStyle = { height, width, left: xPosition, top: yPosition };

      if (maximized) {
        windowStyle = { height: '100%', width: '100%', left: 0, top: 0 };
      }
      if (minimized) {
        windowStyle = { height: 0, width: 0, left: 0, top: 0 };
      }
      return (
        <div className={styles.root} style={windowStyle}>
          {children}
          <div data-clickClass={windowsClickables.fileResizeHandle} data-topClickable data-index={index} data-side={'top'} className={styles.topResizer}></div>
          <div data-clickClass={windowsClickables.fileResizeHandle} data-topClickable data-index={index} data-side={'right'} className={styles.rightResizer}></div>
          <div data-clickClass={windowsClickables.fileResizeHandle} data-topClickable data-index={index} data-side={'bottom'} className={styles.bottomResizer}></div>
          <div data-clickClass={windowsClickables.fileResizeHandle} data-topClickable data-index={index} data-side={'left'} className={styles.leftResizer}></div>

          <div data-clickClass={windowsClickables.fileResizeHandle} data-topClickable data-index={index} data-side={'bottomRight'} className={styles.bottomRightResizer}></div>
          <div data-clickClass={windowsClickables.fileResizeHandle} data-topClickable data-index={index} data-side={'bottomLeft'} className={styles.bottomLeftResizer}></div>
          <div data-clickClass={windowsClickables.fileResizeHandle} data-topClickable data-index={index} data-side={'topRight'} className={styles.topRightResizer}></div>
          <div data-clickClass={windowsClickables.fileResizeHandle} data-topClickable data-index={index} data-side={'topLeft'} className={styles.topLeftResizer}></div>
        </div>);
    }
  }

export default withStyles(styles)(MoveableResizeableWindow);