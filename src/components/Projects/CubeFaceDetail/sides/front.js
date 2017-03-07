import React from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './front.css'; //eslint-disable-line

function Front({professionalProjects}) {
  console.log(professionalProjects);
  return <div className={styles.root}>
    <h1 className={styles.title}>Lorem Ipsum</h1>
    <div className={styles.projectsGrid}>
      { professionalProjects.map(project => {
        const { description, images, link, name, role } = project;

        return (<div className={styles.projectRow}>
          <h3>{name}</h3>
        </div>);
      })}
    </div>
  </div>;
}


export default withStyles(styles)(Front);
