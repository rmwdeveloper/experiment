import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './StockChart.css'; //eslint-disable-line
import HighCharts from 'highcharts';

class StockChart extends Component {
  static propTypes = {
    getChart: PropTypes.func,
  };

  constructor() {
    super();
    this.getOHLC = this.getOHLC.bind(this);
    this.getVolume = this.getVolume.bind(this);
    this.fixDate = this.fixDate.bind(this);
  }

  componentWillMount() {
    this.props.getChart('AAPL');
  }

  getOHLC(data) {
    const dates = data.Dates || [];
    const elements = data.Elements || [];
    const chartSeries = [];
    if (elements[0]) {
      for (let i = 0, datLen = dates.length; i < datLen; i++) {
        const dat = this.fixDate(dates[i]);
        const pointData = [
          dat,
          elements[0].DataSeries.open.values[i],
          elements[0].DataSeries.high.values[i],
          elements[0].DataSeries.low.values[i],
          elements[0].DataSeries.close.values[i]
        ];
        chartSeries.push(pointData);
      }
    }
    return chartSeries;
  }

  fixDate(dateIn) {
    const dat = new Date(dateIn);
    return Date.UTC(dat.getFullYear(), dat.getMonth(), dat.getDate());
  }

  getVolume(data) {
    const dates = data.Dates || [];
    const elements = data.Elements || [];
    const chartSeries = [];

    if (elements[1]) {

      for (let i = 0, datLen = dates.length; i < datLen; i++) {
        const dat = this.fixDate(dates[i]);
        const pointData = [
          dat,
          elements[1].DataSeries.volume.values[i]
        ];
        chartSeries.push(pointData);
      }
    }
    return chartSeries;
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props.charts);
    console.log(nextProps.charts);
  }

  render() {
    let chart = null;
    return <div></div>

  }
}


export default withStyles(styles)(StockChart);
