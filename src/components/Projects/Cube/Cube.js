import React, { PropTypes, Component} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';

import * as cubeActions from '../../../actions/cube';
import styles from './Cube.css'; //eslint-disable-line
import cx from 'classnames';


// todo: refactor
@connect(state => ({
  zoomed: state.cube.zoomed,
  faceShown: state.cube.faceShown
}), { ...cubeActions})
class Cube extends Component {
  constructor() {
    super();
    this.renderSides = this.renderSides.bind(this);
    this.randomRotation = this.randomRotation.bind(this);
    this.randRange = this.randRange.bind(this);
    this.buttonEnter = this.buttonEnter.bind(this);
    this.buttonLeave = this.buttonLeave.bind(this);
    this.clickMenuItem = this.clickMenuItem.bind(this);
    this.zoomOut = this.zoomOut.bind(this);

    this.colors = {
      front: 'rgb(142, 227, 239)',
      back: 'rgb(250, 201, 184)',
      left: 'rgb(120, 128, 181)',
      right: 'rgb(32, 42, 37)',
      top: 'rgb(216, 210, 225)',
      bottom: 'rgb(219, 34, 42)',
    };

  }
  zoomOut() {
    this.props.zoomOut();
    this.randomRotation(this.cube);
    TweenLite.to(this.displayer, 0.1, { display: 'none'});
    TweenLite.to(this.container, 1, { perspective: `1000px`, display: 'block'});
  }
  randRange(min, max){
    return Math.random() * (max - min) + min;
  }
  clickMenuItem(event) {
    const side = event.target.dataset['side'];
    this.displayer = document.getElementById(styles.displayer);

    const element = document.getElementById(side);
    this.rotateAnimation.pause();
    this.props.zoomIn(side);

    TweenLite.to(this.displayer, 1, {display: 'flex', delay: 1});
    TweenLite.to(this.container, 1, {perspective: `100px`, display: 'none'});

    switch (side) {
      case 'front':
        this.rotateToFace = TweenLite.to(this.cube, 1, {transform: `translateZ(200px) rotateY(180deg) scale(1, -1)`});
        TweenLite.to(element, 0.01, {css: { scaleX: -1 }});
        break;
      case 'back':
        this.rotateToFace = TweenLite.to(this.cube, 1, {transform: `translateZ(200px) rotateY(0deg) scale(1, -1)`});
        TweenLite.to(element, 0.01, {css: {scaleX: -1, scaleY: -1 }});
        break;
      case 'left':
        this.rotateToFace = TweenLite.to(this.cube, 1, {transform: `translateZ(200px) rotateY(-270deg) scale(-1, 1)`});
        TweenLite.to(element, 0.01, {css: { scaleY: -1}});
        break;
      case 'right':
        this.rotateToFace = TweenLite.to(this.cube, 1, {transform: `translateZ(200px) rotateY(-90deg) scale(-1, 1)`});
        TweenLite.to(element, 0.01, {css: {transform: 'rotateY(-270deg) translateX(100px) scaleY(-1) translateY(-200px)'}});
        TweenLite.to(element, 0.01, {css: { scaleY: -1}});
        break;
      case 'top':
        this.rotateToFace = TweenLite.to(this.cube, 1, {transform: `translateZ(200px) rotateX(90deg) scale(-1, 1)`});
        TweenLite.to(element, 0.01, {transform: 'rotateX(90deg) translateY(-100px) scale(-1, 1)'});
        break;
      case 'bottom':
        this.rotateToFace = TweenLite.to(this.cube, 1, {transform: `translateZ(200px) rotateX(-90deg) scale(-1, 1)`});
        TweenLite.to(element, 0.01, {transform: 'rotateX(-90deg) translateY(100px) scale(-1, 1)'});
        break;
      default:
        return null;
    }

  }
  buttonEnter(event) {
    const side = event.target.dataset['side'];
    const element = document.getElementById(side);
    if (this.props.zoomed) { return null; }
    this.rotateAnimation.pause();
    this.zoomIn = TweenLite.to(this.container, 1, {perspective: `1000px`});
    switch (side) {
      case 'front':
        this.rotateToFace = TweenLite.to(this.cube, 1, {transform: `translateZ(50px) rotateY(0deg)`});
        TweenLite.to(element, 0.01, {css: {scaleX: 1}});
        break;
      case 'back':
        this.rotateToFace = TweenLite.to(this.cube, 1, {transform: `translateZ(50px) rotateY(180deg)`});
        TweenLite.to(element, 0.01, {css: {scaleY: 1, scaleX: 1}});
        break;
      case 'left':
        this.rotateToFace = TweenLite.to(this.cube, 1, {transform: `translateZ(50px) rotateY(-270deg)`});
        TweenLite.to(element, 0.01, {css: {scaleY: 1, scaleX: 1}});
        break;
      case 'right':
        this.rotateToFace = TweenLite.to(this.cube, 1, {transform: `translateZ(50px) rotateY(270deg)`});
        TweenLite.to(element, 0.01, {css: {transform: 'rotateY(-270deg) translateX(100px)'}});
        break;
      case 'top':
        this.rotateToFace = TweenLite.to(this.cube, 1, {transform: `translateZ(50px) rotateX(-90deg)`});
        TweenLite.to(element, 0.01, {css: {transform: 'rotateX(90deg) translateY(-100px) scale(1, 1)'}});
        break;
      case 'bottom':
        this.rotateToFace = TweenLite.to(this.cube, 1, {transform: `translateZ(50px) rotateX(90deg)`});
        TweenLite.to(element, 0.01, {css: {transform: 'rotateX(-90deg) translateY(100px) scale(1, 1)'}});
        break;
      default:
        return null;
    }
  }
  buttonLeave() {
    if (!this.props.zoomed){
      this.randomRotation(this.cube);
    }
  }
  randomRotation(node) {
    this.rotateAnimation = TweenLite.to(node, this.randRange(5, 10), {
      transform: `rotate3d(${this.randRange(1, 8)}, ${this.randRange(1, 8)}, ${this.randRange(1, 8)}, ${this.randRange(1, 360)}deg)`,
      onComplete: this.randomRotation,
      onCompleteParams: [node] });
  }
  renderSides() {
    this.sides = ['front', 'back', 'right', 'left', 'top', 'bottom'];
    return this.sides.map((side, index) => {
      return <div style={{backgroundColor: this.colors[side], opacity: 0.80}} id={side} key={index} className={cx(styles[side], styles.side)}> {side} </div>
    });
  }
  componentDidMount() {

    this.container = document.getElementById(styles.container);
    this.menuButtons = document.querySelectorAll(`#${styles.menu} button`);
    for (let iterator = 0; iterator < this.menuButtons.length; iterator++) {
      this.menuButtons[iterator].addEventListener('mouseenter', this.buttonEnter);
      this.menuButtons[iterator].addEventListener('mouseleave', this.buttonLeave);
    }
    this.cube = document.getElementById(styles.sidesContainer);
    this.randomRotation(this.cube);

    TweenLite.to(document.getElementById(styles.root), 5, {backgroundImage: 'linear-gradient(#444, #555, #666)'});
    // TweenLite.to(document.getElementById(styles.root), 20, {background: 'linear-gradient(#444, #555, #666)'});
  }
  componentWillUnmount() {
    for (let iterator = 0; iterator < this.menuButtons.length; iterator++) {
      this.menuButtons[iterator].removeEventListener('mouseenter', this.buttonEnter);
      this.menuButtons[iterator].removeEventListener('mouseleave', this.buttonLeave);
    }
  }
  render() {
    const { zoomed, faceShown } = this.props;
    const sides = this.renderSides();
    return (<div id={styles.root}>
      { zoomed ? <i onClick={this.zoomOut} className={cx('fa fa-close', 'fa-2x', styles.closeButton)} /> : null }
      <ul id={styles.menu}>
        { this.sides.map( (side, index) => {
          return <li style={{borderColor: `${this.colors[side]}`}} key={index} className={styles[side]}>
            <button onClick={this.clickMenuItem} data-side={side}>{side}</button>
          </li>;
        })}
      </ul>
      <div id={cx(styles.container, styles.cube)}>
        <div id={styles.sidesContainer}>
          {sides}
        </div>
      </div>
      <div style={{backgroundColor: this.colors[faceShown]}} id={styles.displayer}> {faceShown} </div>
    </div>);
  }
}


export default withStyles(styles)(Cube);
