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
    this.startResize = this.startResize.bind(this);
    this.stopResizing = this.stopResizing.bind(this);
  }
  startResize() {
    window.addEventListener('mousemove', this.drawChart);
    window.addEventListener('mouseup', this.stopResizing);
  }
  stopResizing() {
    window.removeEventListener('mousemove', this.drawChart);
    window.removeEventListener('mouseup', this.stopResizing);
  }
  drawChart() {
    const { diskSpace, usedSpace } = this.props;
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'DiskSpace');
    data.addColumn('number', 'Megabytes');
    data.addRows([
      ['Used', usedSpace],
      ['Available', diskSpace - usedSpace],
    ]);

    // Set chart options
    const options = {'title':'Disk Space (MB)',
      pieSliceText: 'value',
      'width': this.rootElement.offsetWidth,
      'height':this.rootElement.offsetHeight};

    // Instantiate and draw our chart, passing in some options.
    const chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    chart.draw(data, options);
  }
  componentDidMount() {
    const { index } = this.props;
    this.rootElement = document.getElementById(`diskManager${index}`);
    this.fileNodes = [].slice.call(this.rootElement.parentNode.childNodes).filter(nodeElement => {
      return nodeElement.classList.contains('resizerHandle');
    });
    this.fileNodes.forEach(domElement => {
      domElement.addEventListener('mousedown', this.startResize);
    });
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(this.drawChart);
  }
  componentWillUnmount() {
    this.fileNodes.forEach(domElement => {
      domElement.removeEventListener('mousedown', this.startResize);
    });
  }
  render() {
    const { index } = this.props;
    return (<div id={`diskManager${index}`} className={styles.root}>
      
      <div id="chart_div" className={styles.charts}></div>
    </div>);
  }
}


export default withStyles(styles)(DiskManager);
