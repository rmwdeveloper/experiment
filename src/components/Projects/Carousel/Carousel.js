import React, { PropTypes, Component} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Carousel.css'; //eslint-disable-line
import cx from 'classnames';

class Carousel extends Component {
  constructor() {
    super();
    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
    this.applyProps = this.applyProps.bind(this);
    this.onPress = this.onPress.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.endDrag = this.endDrag.bind(this);
    this.random = this.random.bind(this);
    this.randomColor = this.randomColor.bind(this);
  }
  random(min, max) {
    return min + Math.random() * (max - min);
  }
  randomColor() {
    const h = this.random(1, 360);
    const s = this.random(0, 100);
    const l = this.random(0, 100);
    return `hsla(${h}, ${s}%, ${l}%, 0.40)`;
  }
  applyProps(props) {
    const { slide, tweenProps: {y} } = props;
    slide.style.transform = `rotateX( ${y}deg ) translateZ(288px)`;
  }
  onPress(event) {
    this.y = event.y;
  }
  onDrag(event) {
    const deltaY = event.y - this.y; // positive = right, negative = left

    if ( deltaY >= -25 && deltaY <= 25 ) {
      console.log(Math.abs(deltaY / 4));
      if (deltaY > 0 ) {
        event.target.style.transform = `rotateX( -${Math.abs(deltaY / 4)}deg ) translateZ(288px)`;
      }
      else {
        event.target.style.transform = `rotateX( ${Math.abs(deltaY / 4)}deg ) translateZ(288px)`;
      }
    } else if (deltaY < 25) {
      event.target.style.transform = `rotateX( ${Math.floor(25 / 4)}deg ) translateZ(288px)`;
    } else if (deltaY > -25) {
      event.target.style.transform = `rotateX( -${Math.floor(25 / 4)}deg ) translateZ(288px)`;
    }

  }
  endDrag(event) {
    const deltaY = event.y - this.y;
    deltaY < 0 ? this.prev() : this.next();
  }
  prev() {
    const slides = document.querySelectorAll(`.${styles.slide}`);
    for ( let iterator = 0; iterator < slides.length; iterator++){
      const slide = slides[iterator];
      const y = slide.getAttribute('y');
      const tweenProps = {y};
      TweenLite.to(tweenProps, 1, {y: parseInt(y, 10) + 90 , onUpdate:this.applyProps, onUpdateParams: [{slide, tweenProps}]});
      slide.setAttribute('y', parseInt(y, 10) + 90);
    }
  }
  next() {
    const slides = document.querySelectorAll(`.${styles.slide}`);
    for ( let iterator = 0; iterator < slides.length; iterator++){
      const slide = slides[iterator];
      const y = slide.getAttribute('y');
      const tweenProps = {y};
      TweenLite.to(tweenProps, 1, {y: parseInt(y, 10) - 90 , onUpdate:this.applyProps, onUpdateParams: [{slide, tweenProps}]});
      slide.setAttribute('y', parseInt(y, 10) - 90);
    }
  }
  componentDidMount() {
    const { allProjects } = this.props;
    const rotation = 360 / allProjects.length;

    const slides = document.querySelectorAll(`.${styles.slide}`);
    for ( let iterator = 0; iterator < slides.length; iterator++){
      const slide = slides[iterator];
      // TweenLite.set(slide, {transformOrigin: 'center'});
      Draggable.create(slide, {onPress: this.onPress, onDrag: this.onDrag, onDragEnd: this.endDrag,
        bounds: styles.slidesContainer,
        type: 'y',
        lockAxis: true, force3D: true });
      TweenLite.to(slide, 1, {transform: `rotateX(  ${iterator * rotation}deg ) translateZ( 288px)`});
    }
  }
  render() {
    const { allProjects } = this.props;

    const rotation = 360 / allProjects.length;
    return (<div id={styles.root}>
      <div id={styles.container}>
        <div id={styles.slidesContainer}>
          {allProjects ? allProjects.map( (project, index) => {
            const style = {};
            style.transform = `translateZ(200px)`;
            style.backgroundColor = 'hsla(204, 65%, 61%, 0.40)';
            return <div y={index * rotation} style={style} key={index} className={styles.slide}>{index}</div>;
          } ): null}
        </div>
      </div>
      { /* <i onClick={this.prev} className={cx(styles.control, styles.left, 'fa fa-chevron-left')} />
      <i onClick={this.next} className={cx(styles.control, styles.right, 'fa fa-chevron-right')} /> */ }
    </div>);
  }
}


export default withStyles(styles)(Carousel);
