import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './MoveableResizeableWindow.css'; //eslint-disable-line
import { windowsClickables } from '../../../constants/windows';
import cx from 'classnames';

class MoveableResizeableWindow extends Component {
    static propTypes = {
      minimized: PropTypes.bool,
      maximized: PropTypes.bool,
      height: PropTypes.number,
      width: PropTypes.number,
      xPosition: PropTypes.number,
      yPosition: PropTypes.number,
      children: PropTypes.array
    };
    render() {
      const {  uniqueId, children, dimensions } = this.props;
      // TODO : perfect resize action. Make it smoother.
      const {maximized, minimized, height, width, xPosition, yPosition } = dimensions;
      let windowStyle = { height, width, left: xPosition, top: yPosition };

      if (maximized) {
        windowStyle = { height: '100%', width: '100%', left: 0, top: 0 };
      }
      if (minimized) {
        windowStyle = { display: 'none'};
      }
      windowStyle.zIndex = 2;
      return (<div className={styles.root}  style={windowStyle}>
          {children}
          <div data-clickClass={windowsClickables.fileResizeHandle} data-topClickable data-uniqueId={uniqueId} data-side={'top'} className={cx(styles.topResizer, 'resizerHandle')}></div>
          <div data-clickClass={windowsClickables.fileResizeHandle} data-topClickable data-uniqueId={uniqueId} data-side={'right'} className={cx(styles.rightResizer, 'resizerHandle')}></div>
          <div data-clickClass={windowsClickables.fileResizeHandle} data-topClickable data-uniqueId={uniqueId} data-side={'bottom'} className={cx(styles.bottomResizer, 'resizerHandle')}></div>
          <div data-clickClass={windowsClickables.fileResizeHandle} data-topClickable data-uniqueId={uniqueId} data-side={'left'} className={cx(styles.leftResizer, 'resizerHandle')}></div>
          <div data-clickClass={windowsClickables.fileResizeHandle} data-topClickable data-uniqueId={uniqueId} data-side={'bottomRight'} className={cx(styles.bottomRightResizer, 'resizerHandle')}></div>
          <div data-clickClass={windowsClickables.fileResizeHandle} data-topClickable data-uniqueId={uniqueId} data-side={'bottomLeft'} className={cx(styles.bottomLeftResizer, 'resizerHandle')}></div>
          <div data-clickClass={windowsClickables.fileResizeHandle} data-topClickable data-uniqueId={uniqueId} data-side={'topRight'} className={cx(styles.topRightResizer, 'resizerHandle')}></div>
          <div data-clickClass={windowsClickables.fileResizeHandle} data-topClickable data-uniqueId={uniqueId} data-side={'topLeft'} className={cx(styles.topLeftResizer, 'resizerHandle')}></div>
        </div>);
    }
  }

export default withStyles(styles)(MoveableResizeableWindow);