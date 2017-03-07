import React, { PropTypes, Component} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import * as cubeActions from '../../../actions/cube';
import styles from './Cube.css'; //eslint-disable-line
import cx from 'classnames';

import CubeFaceDetail from '../CubeFaceDetail';

// todo: refactor
@connect(state => ({
  zoomed: state.cube.zoomed,
  faceShown: state.cube.faceShown,
  menuOpened: state.cube.menuOpened,
  professionalProjects: state.projects.professionalProjects,
  personalProjects: state.projects.personalProjects,
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
    this.closeMenu = this.closeMenu.bind(this);
    this.openMenu = this.openMenu.bind(this);

    this.sides = ['front', 'back', 'right', 'left', 'top', 'bottom'];

    this.sections = {
      front: 'Projects - Professional',
      back: 'Projects - Personal',
      left: 'About',
      // right: 'Contact'
    };
    this.colors = {
      front: 'rgb(142, 227, 239)',
      back: 'rgb(250, 201, 184)',
      left: 'rgb(120, 128, 181)',
      right: 'rgb(32, 42, 37)',
      top: 'rgb(216, 210, 225)',
      bottom: 'rgb(219, 34, 42)',
    };

  }
  closeMenu() {
    this.props.closeMenu();
    TweenLite.to(this.contactList, 0.01, {display: 'none'});
    TweenLite.to(this.menu, 0.01, {display: 'none'});
    TweenLite.to(this.menuWrapper, 1, {position: 'absolute', height: '60px', minHeight: '60px', width: '60px'});
    TweenLite.to(this.brandIcon, 1, {fontSize: '42px'});
    TweenLite.to(this.menuWrapper, 1, {delay: 1, top: '-50px'});
    TweenLite.to(this.toggleButton, 0.5, {delay: 0.1, bottom: '-10px'});
  }
  openMenu() {
    this.props.openMenu();
    TweenLite.to(this.menuWrapper, 0.1, { top: '0'});
    TweenLite.to(this.menuWrapper, 0.1, { delay: 0.1, height: '100%', minHeight: '500px', width: '100px'});
    TweenLite.to(this.brandIcon, 0.1, {delay: 0.1, fontSize: '72px'});
    TweenLite.to(this.menuWrapper, 0.1, { delay: 0.2, position: 'relative'});
    TweenLite.to(this.contactList, 0.1, {delay: 0.2, display: 'flex', bottom: '25px'});
    TweenLite.to(this.menu, 0.1, {delay: 0.2, display: 'block'});
    TweenLite.to(this.toggleButton, 0.1, {delay: 0.2, bottom: '0'});
  }
  zoomOut() {
    // todo: God, refactor this garbage
    if (this.cubeTween) {
      this.cubeTween.kill();
      this.faceTween.kill();
    }
    const sides = document.getElementsByClassName(styles.side);
    this.props.zoomOut();
    this.randomRotation(this.cube);
    this.showDisplayerAnimation.kill();
    TweenLite.to(this.displayer, 0.1, { display: 'none'});
    // TweenLite.to(this.container, 1, { perspective: `1000px`, display: 'block'});

    TweenLite.to(this.container, 1, { perspective: `1000px`, display: 'block'});
    for (let iterator = 0; iterator < sides.length; iterator++){
      sides[iterator].style.transform = '';
    }
  }
  randRange(min, max){
    return Math.random() * (max - min) + min;
  }
  clickMenuItem(event) {
    if (this.cubeTween) {
      this.cubeTween.kill();
      this.faceTween.kill();
    }
    const side = event.target.dataset['side'];
    this.displayer = document.getElementById(styles.displayer);

    const element = document.getElementById(side);
    this.rotateAnimation.pause();
    this.props.zoomIn(side);

    this.showDisplayerAnimation = TweenLite.to(this.displayer, 1, {display: 'flex', delay: 1});
    TweenLite.to(this.container, 1, {perspective: `100px`, display: 'none'});

    switch (side) {
      case 'front':
        this.cubeTween = TweenLite.to(this.cube, 1, {transform: `translateZ(200px) rotateY(180deg) scale(1, -1)`});
        this.faceTween = TweenLite.to(element, 0.01, {css: { scaleX: -1 }});
        break;
      case 'back':
        this.cubeTween = TweenLite.to(this.cube, 1, {transform: `translateZ(200px) rotateY(0deg) scale(1, -1)`});
        this.faceTween = TweenLite.to(element, 0.01, {css: {scaleX: -1, scaleY: -1 }});
        break;
      case 'left':
        this.cubeTween = TweenLite.to(this.cube, 1, {transform: `translateZ(200px) rotateY(-270deg) scale(-1, 1)`});
        this.faceTween = TweenLite.to(element, 0.01, {css: { scaleY: -1}});
        break;
      case 'right':
        this.cubeTween = TweenLite.to(this.cube, 1, {transform: `translateZ(200px) rotateY(-90deg) scale(-1, 1)`});
        this.faceTween = TweenLite.to(element, 0.01, {css: {transform: 'rotateY(-270deg) translateX(100px) scaleY(-1) translateY(-200px)'}});
        TweenLite.to(element, 0.01, {css: { scaleY: -1}});
        break;
      case 'top':
        this.cubeTween = TweenLite.to(this.cube, 1, {transform: `translateZ(200px) rotateX(90deg) scale(-1, 1)`});
        this.faceTween = TweenLite.to(element, 0.01, {transform: 'rotateX(90deg) translateY(-100px) scale(-1, 1)'});
        break;
      case 'bottom':
        this.cubeTween = TweenLite.to(this.cube, 1, {transform: `translateZ(200px) rotateX(-90deg) scale(-1, 1)`});
        this.faceTween = TweenLite.to(element, 0.01, {transform: 'rotateX(-90deg) translateY(100px) scale(-1, 1)'});
        break;
      default:
        return null;
    }
  }
  buttonEnter(event) {
    const side = event.target.dataset['side'];
    const element = document.getElementById(side);
    if (this.cubeTween) {
      this.cubeTween.kill();
      this.faceTween.kill();
    }
    if (this.props.zoomed) { return null; }
    this.rotateAnimation.pause();
    this.zoomIn = TweenLite.to(this.container, 1, {perspective: `1000px`});
    switch (side) {
      case 'front':
        TweenLite.to(this.cube, 1, {transform: `translateZ(50px) rotateY(0deg) scale(1, 1)`});
        TweenLite.to(element, 0.01, {css: {scaleX: 1}});
        break;
      case 'back':
        TweenLite.to(this.cube, 1, {transform: `translateZ(50px) rotateY(180deg) scale(1, 1)`});
        TweenLite.to(element, 0.01, {css: {scaleY: 1, scaleX: 1}});
        break;
      case 'left':
        TweenLite.to(this.cube, 1, {transform: `translateZ(50px) rotateY(-270deg) scale(1, 1)`});
        TweenLite.to(this.cube, 1, {transform: `translateZ(50px) rotateY(-270deg) scale(1, 1)`});
        TweenLite.to(element, 0.01, {css: {scaleY: 1, scaleX: 1}});
        break;
      case 'right':
        TweenLite.to(this.cube, 1, {transform: `translateZ(50px) rotateY(270deg) scale(1, 1)`});
        TweenLite.to(element, 0.01, {css: {transform: 'rotateY(-270deg) translateX(100px)'}});
        break;
      case 'top':
        TweenLite.to(this.cube, 1, {transform: `translateZ(50px) rotateX(-90deg) scale(1, 1)`});
        TweenLite.to(element, 0.01, {css: {transform: 'rotateX(90deg) translateY(-100px) scale(1, 1)'}});
        break;
      case 'bottom':
        TweenLite.to(this.cube, 1, {transform: `translateZ(50px) rotateX(90deg) scale(1, 1)`});
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

    return this.sides.map((side, index) => {
      return <div style={{backgroundColor: this.colors[side], opacity: 0.80}} id={side} key={index} className={cx(styles[side], styles.side)}> {this.sections[side]} </div>;
    });
  }
  componentDidMount() {
    this.container = document.getElementById(styles.container);
    this.brandIcon = document.getElementById(styles.brandIcon);
    this.menu = document.getElementById(styles.menu);
    this.menuWrapper = document.getElementById(styles.menuWrapper);
    this.contactList = document.getElementById(styles.contactList);
    this.menuButtons = document.querySelectorAll(`#${styles.menu} button`);
    this.toggleButton = document.getElementById(styles.toggleButton);
    for (let iterator = 0; iterator < this.menuButtons.length; iterator++) {
      this.menuButtons[iterator].addEventListener('mouseenter', this.buttonEnter);
      this.menuButtons[iterator].addEventListener('mouseleave', this.buttonLeave);
    }
    this.cube = document.getElementById(styles.sidesContainer);
    this.randomRotation(this.cube);

    TweenLite.to(document.getElementById(styles.root), 5, {backgroundImage: 'linear-gradient(#444, #555, #666)'});


  }
  componentWillUnmount() {
    for (let iterator = 0; iterator < this.menuButtons.length; iterator++) {
      this.menuButtons[iterator].removeEventListener('mouseenter', this.buttonEnter);
      this.menuButtons[iterator].removeEventListener('mouseleave', this.buttonLeave);
    }
  }
  render() {
    const { zoomed, faceShown, menuOpened, personalProjects, professionalProjects } = this.props;
    const sides = this.renderSides();

    return (<div id={styles.root}>
      { zoomed ? <i onClick={this.zoomOut} className={cx('fa fa-close', 'fa-2x', styles.closeButton)} /> : null }

      <div id={styles.menuWrapper}>
        <div onClick={this.zoomOut} id={styles.brandIcon}>R</div>
        { menuOpened ? <div onClick={this.closeMenu} id={styles.toggleButton}>< i className="fa fa-chevron-up" /></div> :
          <div onClick={this.openMenu} id={styles.toggleButton}>< i className="fa fa-chevron-down" /></div>}

        <ul id={styles.menu}>

          { Object.keys(this.sections).map( (key, index) => {

            const menuItemStyles = {borderColor: this.colors[key]};

            if (key === faceShown) {
              menuItemStyles.backgroundColor = this.colors[key];
              menuItemStyles.color = '#FFF';
            }

            return <li style={menuItemStyles} key={index} className={styles[key]}>
              <button onClick={this.clickMenuItem} data-side={key}>{this.sections[key]}</button>
            </li>;
          })}

        </ul>
        <ul id={styles.contactList}>
          <li><a href="https://linkedin.com/in/robert-westenberger"><i className="fa fa-linkedin" /></a></li>
          <li><a href="https://github.com/rmwdeveloper"><i className="fa fa-github-alt" /></a></li>
          <li><a href="mailto:rmwdeveloper@gmail.com"><i className="fa fa-envelope-o" /></a></li>
          <li><a href="tel:+9734761264"><i className="fa fa-mobile-phone" /></a></li>
        </ul>
      </div>
      <div className={styles.cubeAndDisplay}>

        <div id={cx(styles.container, styles.cube)}>
          <div id={styles.sidesContainer}>
            {sides}
          </div>
        </div>
        <CubeFaceDetail professionalProjects={professionalProjects} personalProjects={personalProjects}
          faceShown={faceShown} backgroundColor={this.colors[faceShown]} id={styles.displayer}
          section={this.sections[faceShown]} />
        </div>
    </div>);
  }
}


export default withStyles(styles)(Cube);
