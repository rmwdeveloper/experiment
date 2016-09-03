import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './LayoutRenderer.css'; //eslint-disable-line
import cx from 'classnames';

import LayoutCell from '../../components/LayoutCell';
import LayoutBlock from '../../components/LayoutBlock';

class LayoutRenderer extends Component {
  static propTypes = {
    children: PropTypes.array,
    classNumber: PropTypes.number
  };
  constructor(){
    super();
    this.getCellsInSameRowsFilter = this.getCellsInSameRowsFilter.bind(this);
    this.renderBlocks = this.renderBlocks.bind(this);
    this.deduplicateCellsFilter = this.deduplicateCellsFilter.bind(this);
    this.getGroupedColumnCount = this.getGroupedColumnCount.bind(this);
  }

  getCellsInSameRowsFilter(rowStart, rowEnd, value) {
    return (rowStart <= Number(value.index[0])) && (Number(value.index[0]) < rowEnd);
  }
  getGroupedColumnCount(cells, columnIndex) {
    let counter = 0;
    for (let iterator = 0; iterator < cells.length; iterator++) {
      if (columnIndex === cells[iterator].index[1]) {
        counter++;
      }
    }
    return counter;
  }
  deduplicateCellsFilter(alreadyRendered, value) {
    return !alreadyRendered.includes(value.props.layoutIndices);
  }
  renderBlocks(blockedElements, className){
    const elements = [];
    for (const columnIndex in blockedElements) { //eslint-disable-line
      if (blockedElements.hasOwnProperty(columnIndex)) {
        elements.push(React.createElement(LayoutBlock, {key: columnIndex, className}, blockedElements[columnIndex]));
      }
    }
    return elements;
  }

  render() {
    const {
      rowCount, columnCount, layout, resizingLayoutIndex, boundingBox,
      resizingInProgress, startResize, resizingNeedsConfirm, markAsOverlapped, resizingDone,
      resizingCell, resizeComplete, className
    } = this.props;

    console.dir(layout);
    const layoutCells = [];
    const alreadyRendered = [];

    for (let cellIndex = 0; cellIndex < layout.length; cellIndex++) { // For every cell
      if (alreadyRendered.includes(layout[cellIndex].index)) { // todo: probably shouldn't need this. Don't
        continue;                                              // render extraneously
      }
      const cell = layout[cellIndex];
      const className = `col-lg-${Math.floor(12 / (columnCount / cell.columns))} col-md-6 col-sm-12 col-xs-12`;
      const cellHeight = (cell.rows / rowCount) * 100;
      if (cell.rows > 1) {
        const restOfElements = [...layout.slice(0, cellIndex), ...layout.slice(cellIndex + 1)];
        const cellRowRange = (Number(cell.index[0]) + cell.rows);
        const sameLevelCells = restOfElements.filter(this.getCellsInSameRowsFilter.bind(null, Number(cell.index[0]), cellRowRange));
        alreadyRendered.push(...sameLevelCells.map((item) => {
          return item.index;
        }));

        const cellsGroupedByColumn = {};
        for (let iterator = 0; iterator < sameLevelCells.length; iterator++) {
          if (cellsGroupedByColumn.hasOwnProperty(sameLevelCells[iterator].index[1])) {
            cellsGroupedByColumn[sameLevelCells[iterator].index[1]].push(
              React.createElement(LayoutCell, {
                resizingCell, resizingInProgress, startResize,
                resizingNeedsConfirm, markAsOverlapped, cellHeight: (100 / this.getGroupedColumnCount(sameLevelCells, sameLevelCells[iterator].index[1])), resizingDone,
                resizeComplete, className: "col-xs-12", layoutIndices: sameLevelCells[iterator].index, key: sameLevelCells[iterator].index, resizingLayoutIndex, boundingBox
              }));
          } else {
            cellsGroupedByColumn[sameLevelCells[iterator].index[1]] = [];
            cellsGroupedByColumn[sameLevelCells[iterator].index[1]].push(

              React.createElement(LayoutCell, {
                resizingCell, resizingInProgress, startResize,
                resizingNeedsConfirm, markAsOverlapped, cellHeight: (100 / this.getGroupedColumnCount(sameLevelCells, sameLevelCells[iterator].index[1])), resizingDone,
                resizeComplete, className: "col-xs-12", layoutIndices: sameLevelCells[iterator].index, key: sameLevelCells[iterator].index, resizingLayoutIndex, boundingBox
              }));
          }
        }
        layoutCells.push(...this.renderBlocks(cellsGroupedByColumn, className));

      }
      layoutCells.push(React.createElement(LayoutCell, {
        resizingCell, resizingInProgress, startResize,
        resizingNeedsConfirm, markAsOverlapped, cellHeight, resizingDone,
        resizeComplete, className, layoutIndices: cell.index, key: cell.index, resizingLayoutIndex, boundingBox
      }));
    }

    const uniqueCells = layoutCells.filter(this.deduplicateCellsFilter.bind(null, alreadyRendered));
    uniqueCells.sort((cellA, cellB) => {
      return Number(cellA.key) - Number(cellB.key);
    });

    return <div className={className}>{uniqueCells}</div>;
  }
}


export default withStyles(styles)(LayoutRenderer);
