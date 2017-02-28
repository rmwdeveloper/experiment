import React, { PropTypes, Component} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Carousel.css'; //eslint-disable-line
import cx from 'classnames';
import { TweenLite } from 'gsap';


class Carousel extends Component {
  constructor() {
    super();
    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
    this.applyProps = this.applyProps.bind(this);
  }
  applyProps(props) {
    const { slide, tweenProps: {y} } = props;

     slide.style.transform = `rotateY( ${y}deg ) translateZ(288px)`;

    // console.log(slide.style.transform);
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
  render() {
    const { allProjects } = this.props;

    const rotation = 360 / allProjects.length;
    return (<div id={styles.root}>
      <div id={styles.container}>
        <div id={styles.slidesContainer}>
          {allProjects ? allProjects.map( (project, index) => {
            const style = {};
            style.transform = `rotateY(  ${index * rotation}deg ) translateZ( 288px)`;
            return <div y={index * rotation} style={style} key={index} className={styles.slide}>{index}</div>;
          } ): null}
        </div>
      </div>
      <i onClick={this.prev} className={cx(styles.control, styles.left, 'fa fa-chevron-left')} />
      <i onClick={this.next} className={cx(styles.control, styles.right, 'fa fa-chevron-right')} />
    </div>);
  }
}


export default withStyles(styles)(Carousel);
