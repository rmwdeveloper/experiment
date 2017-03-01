import React, { PropTypes, Component} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Cube.css'; //eslint-disable-line
import cx from 'classnames';

class Cube extends Component {
  constructor() {
    super();
    this.renderSides = this.renderSides.bind(this);
    this.randomRotation = this.randomRotation.bind(this);
    this.randRange = this.randRange.bind(this);
  }
  randRange(min, max){
    return Math.random() * (max - min) + min;
  }
  randomRotation(node) {
    TweenMax.to(node, this.randRange(5, 10), {
      transform: `rotate3d(${this.randRange(1, 8)}, ${this.randRange(1, 8)}, ${this.randRange(1, 8)}, ${this.randRange(1, 360)}deg)`,
      onComplete: this.randomRotation,
      onCompleteParams: [node] });
  }
  renderSides() {
    const sides = ['front', 'back', 'right', 'left', 'top', 'bottom'];
    return sides.map((side, index) => {
      return <div key={index} className={cx(styles[side], styles.side)}> {side} </div>
    });
  }
  componentDidMount() {
    this.cube = document.getElementById(styles.sidesContainer);
    // this.rotate = new TimelineMax();
    this.randomRotation(this.cube);
    // this.rotate.to(this.cube, 16, {transform: 'rotate3d(8, 1, 1, 180deg)', repeatDelay: 0, repeat: -1, yoyo: true});

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
