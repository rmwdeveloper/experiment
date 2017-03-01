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
      return <div key={index} className={cx(styles[side], styles.side)}> {side} </div>
    });
  }
  componentDidMount() {
    this.cube = document.getElementById(styles.sidesContainer);
    this.rotate = new TimelineMax();
    // this.horizontalRotate = new TimelineMax();
    // this.verticalRotate = new TimelineMax();

    this.rotate.to(this.cube, 16, {transform: 'rotate3d(8, 1, 1, 180deg)', repeatDelay: 0, repeat: -1, yoyo: true});
    // this.horizontalRotate.to(this.cube, 4, {transform: 'rotateY(180deg)', repeatDelay: 0, repeat: -1, yoyo: true});
    // this.verticalRotate.to(this.cube, 4, {transform: 'rotateX(180deg)', repeatDelay: 0, repeat: -1, yoyo: true});
    // this.rotate.play();
    // this.horizontalRotate.play();
    // this.verticalRotate.play();
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
