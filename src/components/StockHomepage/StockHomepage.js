import React, {PropTypes, Component} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './StockHomepage.css'; //eslint-disable-line

import LayoutColumn from '../LayoutColumn';
import widgetRegistry from '../widgetRegistry';

class StockHomepage extends Component {
  static propTypes = {
    widgets: PropTypes.object,
    cells: PropTypes.array,
    layout: PropTypes.array,
  };
  constructor() {
    super();
    this.state = {
      columns: null
    };
  }
  render() {
    const { widgets, cells, layout } = this.props;

    return (
      <div className="row">
        {
          layout.map((column, index, array) => {
            return React.createElement(LayoutColumn,
              { className: 'col-lg-4 col-md-4 col-sm-6 col-xs-12' },
              column.map(cell => {
                return React.createElement(widgetRegistry[widgets[cell.widget.type]]);
              })
            );
          })
        }
      </div>
    );
  }
}


export default withStyles(styles)(StockHomepage);
