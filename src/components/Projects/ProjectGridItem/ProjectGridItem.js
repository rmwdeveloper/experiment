import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './ProjectGridItem.css'; //eslint-disable-line

function ProjectGridItem({ project: {name, technologies, role, description, link}}) {

  return (
    <div>
      {name}
      {technologies}
      {role}
      {description}
      {link}
    </div>
  );
}

export default withStyles(styles)(ProjectGridItem);
