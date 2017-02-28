import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Carousel.css'; //eslint-disable-line
import cx from 'classnames';
import { TweenLite } from 'gsap';


class Carousel extends Component {
  render() {
    const { allProjects } = this.props;

    const rotation = 360 / allProjects.length;
    return (<div id={styles.root}>
      <div id={styles.container}>
        <div id={styles.slidesContainer}>
          {allProjects ? allProjects.map( (project, index) => {
            const style = {};
            style.transform = `rotateY(  ${index * rotation}deg ) translateZ( 288px)`;
            return <div style={style} key={index} className={styles.slide}>{index}</div>;
          } ): null}
        </div>
      </div>
      <i className={cx(styles.control, styles.left, 'fa fa-chevron-left')} />
      <i className={cx(styles.control, styles.right, 'fa fa-chevron-right')} />
    </div>);
  }
}


export default withStyles(styles)(Carousel);
