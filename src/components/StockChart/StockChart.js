import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './StockChart.css'; //eslint-disable-line


class StockChart extends Component {
  static propTypes = {
    getChart: PropTypes.func,
  };
  componentWillMount() {
    this.props.getChart('goog');
  }
  render() {
    console.log(this.props.charts);
    return (
      <div className={styles.root}>

      </div>
    );
  }
}


export default withStyles(styles)(StockChart);
