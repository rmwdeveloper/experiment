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
    this.buttonEnter = this.buttonEnter.bind(this);
    this.buttonLeave = this.buttonLeave.bind(this);
  }
  randRange(min, max){
    return Math.random() * (max - min) + min;
  }
  buttonEnter(event) {
    const side = event.target.dataset['side'];

    this.rotateAnimation.pause();

    switch (side) {
      case 'front':
        this.rotateToFace = TweenMax.to(this.cube, 1, {transform: `translateZ(50px) rotateY(0deg)`});
        break;
      case 'back':
        this.rotateToFace = TweenMax.to(this.cube, 1, {transform: `translateZ(50px) rotateY(180deg)`});
        break;
      case 'left':
        this.rotateToFace = TweenMax.to(this.cube, 1, {transform: `translateZ(50px) rotateY(-270deg)`});
        break;
      case 'right':
        this.rotateToFace = TweenMax.to(this.cube, 1, {transform: `translateZ(50px) rotateY(270deg)`});
        break;
      case 'top':
        this.rotateToFace = TweenMax.to(this.cube, 1, {transform: `translateZ(50px) rotateX(-90deg)`});
        break;
      case 'bottom':
        this.rotateToFace = TweenMax.to(this.cube, 1, {transform: `translateZ(50px) rotateX(90deg)`});
        break;
      default:
        return null;
    }
  }
  buttonLeave() {
    this.randomRotation(this.cube);
  }
  randomRotation(node) {
    this.rotateAnimation = TweenMax.to(node, this.randRange(5, 10), {
      transform: `rotate3d(${this.randRange(1, 8)}, ${this.randRange(1, 8)}, ${this.randRange(1, 8)}, ${this.randRange(1, 360)}deg)`,
      onComplete: this.randomRotation,
      onCompleteParams: [node] });
  }
  renderSides() {
    const sides = ['front', 'back', 'right', 'left', 'top', 'bottom'];
    return sides.map((side, index) => {
      return <div  key={index} className={cx(styles[side], styles.side)}> {side} </div>
    });
  }
  componentDidMount() {
    this.menuButtons = document.querySelectorAll(`#${styles.menu} button`);

    for (let iterator = 0; iterator < this.menuButtons.length; iterator++) {
      this.menuButtons[iterator].addEventListener('mouseenter', this.buttonEnter);
      this.menuButtons[iterator].addEventListener('mouseleave', this.buttonLeave);
    }
    this.cube = document.getElementById(styles.sidesContainer);
    // this.rotate = new TimelineMax();
    this.randomRotation(this.cube);
    // this.rotate.to(this.cube, 16, {transform: 'rotate3d(8, 1, 1, 180deg)', repeatDelay: 0, repeat: -1, yoyo: true});

  }
  componentWillUnmount() {
    for (let iterator = 0; iterator < this.menuButtons.length; iterator++) {
      this.menuButtons[iterator].removeEventListener('mouseenter', this.buttonEnter);
      this.menuButtons[iterator].removeEventListener('mouseleave', this.buttonLeave);
    }
  }
  render() {
    const { allProjects } = this.props;
    const sides = this.renderSides();
    const rotation = 360 / allProjects.length;
    return (<div id={styles.root}>
      <ul id={styles.menu}>
        <li className={cx(styles.front)}><button data-side={'front'}>Front</button></li>
        <li className={cx(styles.back)}><button data-side={'back'}>Back</button></li>
        <li className={cx(styles.left)}><button data-side={'left'}>left</button></li>
        <li className={cx(styles.right)}><button data-side={'right'}>right</button></li>
        <li className={cx(styles.top)}><button data-side={'top'}>top</button></li>
        <li className={cx(styles.bottom)}><button data-side={'bottom'}>bottom</button></li>
      </ul>
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
