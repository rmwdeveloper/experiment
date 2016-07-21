import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './StockChart.css'; //eslint-disable-line
import HighCharts from 'highcharts/highstock';

class StockChart extends Component {
  static propTypes = {
    getChart: PropTypes.func,
    displayedChart: PropTypes.string,
    charts: PropTypes.object
  };

  constructor() {
    super();
    this.getOHLC = this.getOHLC.bind(this);
    this.getVolume = this.getVolume.bind(this);
    this.fixDate = this.fixDate.bind(this);
    this.groupingUnits = [[
      'week',
      [1]
    ], [
      'month',
      [1, 2, 3, 4, 6]
    ]];
  }

  componentWillMount() {
    this.props.getChart(this.props.displayedChart);
  }

  fixDate(dateIn) {
    const dat = new Date(dateIn);
    return Date.UTC(dat.getFullYear(), dat.getMonth(), dat.getDate());
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

    if(nextProps.charts[nextProps.displayedChart]) {
      const data = nextProps.charts[nextProps.displayedChart];
      const ohlc = this.getOHLC(data);
      const volume = this.getVolume(data);
      HighCharts.chart("highcharts-container",{
        rangeSelector: {selected: 1},
        title: {text: `${nextProps.displayedChart} Historical Price`},
        yAxis: [{
          title: {
            text: 'OHLC'
          },
          height: 200,
          lineWidth: 2
        }, {
          title: {
            text: 'Volume'
          },
          top: 300,
          height: 100,
          offset: 0,
          lineWidth: 2
        }],

        series: [{
          type: 'candlestick',
          name: nextProps.displayedChart,
          data: ohlc,
          dataGrouping: {
            units: this.groupingUnits
          }
        }, {
          type: 'column',
          name: 'Volume',
          data: volume,
          yAxis: 1,
          dataGrouping: {
            units: this.groupingUnits
          }
        }],
        credits: {
          enabled: false
        }
      });
    }
  }

  render() {
    let chart = null;
    return <div id="highcharts-container"></div>

  }
}


export default withStyles(styles)(StockChart);
