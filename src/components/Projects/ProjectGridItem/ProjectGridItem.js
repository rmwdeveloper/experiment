import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './ProjectGridItem.css'; //eslint-disable-line
import { TweenLite } from 'gsap';



function ProjectGridItem({ project: {name, technologies, role, description, link}}) {
  
  return (
    <div className={styles.root}>
      {name}
      {technologies}
      {role}
      {description}
      {link}
    </div>
  );
  
}

export default withStyles(styles)(ProjectGridItem);
