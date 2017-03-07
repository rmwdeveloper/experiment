import React from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './front.css'; //eslint-disable-line

function Front({professionalProjects}) {

  return <div className={styles.root}>
    <h1 className={styles.title}>Lorem Ipsum</h1>
    <div className={styles.projectsGrid}>
      { professionalProjects.map(project => {
        const { description, images, link, name, role, technologies } = project;
        return (<div className={styles.projectRow}>
          <h3 className={styles.projectName}>{name}</h3>
          <div className={styles.contentBlock}>
            <div className={styles.imageBlock}>
              {images ? images.map(image => {
                return <img src={image} />;
            }) : null }
            </div>
            <div className={styles.detailBlock}>
              <p>{role}</p>
              <p>{description}</p>
              {technologies.map(technology => {
                return <span> {technology} </span>;
              })}
            </div>
          </div>
        </div>);
      })}
    </div>
  </div>;
}


export default withStyles(styles)(Front);
