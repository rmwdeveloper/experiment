import React, { PropTypes, Component } from 'react';
import styles from './DiskManager.css'; //eslint-disable-line
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { windowsClickables } from '../../../constants/windows';

class DiskManager extends Component {
  static propTypes = {

  };
  constructor() {
    super();
    this.drawChart = this.drawChart.bind(this);
  }
  drawChart() {
    // Create the data table.
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Slices');
    data.addRows([
      ['Mushrooms', 3],
      ['Onions', 1],
      ['Olives', 1],
      ['Zucchini', 1],
      ['Pepperoni', 2]
    ]);

    // Set chart options
    const options = {'title':'How Much Pizza I Ate Last Night',
      'width':'100%',
      'height':300};

    // Instantiate and draw our chart, passing in some options.
    const chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    chart.draw(data, options);
  }
  componentDidMount() {
    const { index } = this.props;
    const fileWindow = document.getElementById(`diskManager${index}`).parentNode;
    console.log(fileWindow);
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(this.drawChart);
  }
  render() {
    const { index } = this.props;
    return (<div id={`diskManager${index}`} className={styles.root}>
      <div id="chart_div" className={styles.charts}>

      </div>
    </div>);
  }
}


export default withStyles(styles)(DiskManager);
