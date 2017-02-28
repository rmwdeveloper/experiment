import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Carousel.css'; //eslint-disable-line
import { TweenLite } from 'gsap';



function Carousel({allProjects}) {
  const rotation = 360 / allProjects.length;
  return (<div id={styles.root}>
    <div id={styles.container}>
      <div id={styles.carousel}>
        {allProjects ? allProjects.map( (project, index) => {

          const style = {};
          style.transform = `rotateY(  ${index * rotation}deg ) translateZ( 288px)`;
          console.log(style);
          return <div style={style} key={index} className={styles.slide}>{index}</div>;
        } ): null}
      </div>
    </div>
  </div>);
}

export default withStyles(styles)(Carousel);
