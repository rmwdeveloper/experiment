import React, {PropTypes, Component} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './StockHomepage.css'; //eslint-disable-line
import cx from 'classnames';
import { DragDropContext as dragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import LayoutColumn from '../LayoutColumn';
import widgetRegistry from '../widgetRegistry';

class StockHomepage extends Component {
  static propTypes = {
    widgets: PropTypes.object,
    columns: PropTypes.object,
    cells: PropTypes.array,
    layout: PropTypes.array,
    swapWidgetPosition: PropTypes.func,
    first: PropTypes.string,
    last: PropTypes.string,
    handle: PropTypes.string,
    searchStocks: PropTypes.func,
    searches: PropTypes.object,
    watchStock: PropTypes.func,
    watchedStocks: PropTypes.array
  };
  constructor() {
    super();
    this.state = {
      columns: null
    };
  }
  render() {
    const { widgets, layout, swapWidgetPosition, first, last, handle, columns, searchStocks,
      searches, watchStock, watchedStocks } = this.props;

    return (
      <div className={cx('row', styles.root)}>
        {
          layout.map((column, index, array) => {

            return React.createElement(LayoutColumn,
              { className: columns[index].className , key: index },
              column.map((cell, index) => {
                return React.createElement(widgetRegistry[widgets[cell.widget].type], { key: index,
                  swapWidgetPosition, cell, first, last, handle, searchStocks, searches, watchStock,
                watchedStocks});
              })
            );
          })
        }
      </div>
    );
  }
}


export default dragDropContext(HTML5Backend)(StockHomepage);
