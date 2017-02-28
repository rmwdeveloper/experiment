import React, { PropTypes, Component} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Cube.css'; //eslint-disable-line
import cx from 'classnames';

class Cube extends Component {
  constructor() {
    super();
    this.renderSides = this.renderSides.bind(this);
  }
  renderSides() {
    const sides = ['front', 'back', 'right', 'left', 'top', 'bottom'];
    return sides.map((side, index) => {
      return <div key={index} className={cx(styles[side], styles.side)}> {index} </div>
    });
  }
  render() {
    const { allProjects } = this.props;
    const sides = this.renderSides();
    const rotation = 360 / allProjects.length;
    return (<div id={styles.root}>
      <div id={styles.container}>
        <div id={styles.sidesContainer}>
          {sides}
        </div>
      </div>
      { /* <i onClick={this.prev} className={cx(styles.control, styles.left, 'fa fa-chevron-left')} />
      <i onClick={this.next} className={cx(styles.control, styles.right, 'fa fa-chevron-right')} /> */ }
    </div>);
  }
}


export default withStyles(styles)(Cube);
