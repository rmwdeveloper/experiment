import React, {PropTypes, Component} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './StockHomepage.css'; //eslint-disable-line

import { DragDropContext as dragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import LayoutColumn from '../LayoutColumn';
import widgetRegistry from '../widgetRegistry';

class StockHomepage extends Component {
  static propTypes = {
    widgets: PropTypes.object,
    cells: PropTypes.array,
    layout: PropTypes.array,
    swapWidgetPosition: PropTypes.func,
    first: PropTypes.string,
    last: PropTypes.string,
    handle: PropTypes.string
  };
  constructor() {
    super();
    this.state = {
      columns: null
    };
  }
  render() {
    const { widgets, layout, swapWidgetPosition, first, last, handle } = this.props;

    return (
      <div className="row">
        {
          layout.map((column, index, array) => {
            return React.createElement(LayoutColumn,
              { className: 'col-lg-4 col-md-4 col-sm-6 col-xs-12', key: index },
              column.map((cell, index) => {
                return React.createElement(widgetRegistry[widgets[cell.widget].type], { key: index,
                  swapWidgetPosition, cell, first, last, handle });
              })
            );
          })
        }
      </div>
    );
  }
}


export default dragDropContext(HTML5Backend)(StockHomepage);
