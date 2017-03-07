import React, { PropTypes, Component } from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './ProjectRows.css'; //eslint-disable-line

export default function projectRows(type) {
  class ProjectRows extends Component {
    render() {
      const { professionalProjects, personalProjects } = this.props;

      const projects = type === 'professional' ? professionalProjects : personalProjects;


      return <div className={styles.root}>
        <h1 className={styles.title}>{ type === 'professional' ? 'Professional' : 'Personal'}</h1>
        <div className={styles.projectsGrid}>
          { projects.map(project => {
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
                  <div className={styles.technologiesBlock}>
                    {technologies.map(technology => {
                      return <span> {technology} </span>;
                    })}
                  </div>
                </div>
              </div>
            </div>);
          })}
        </div>
      </div>;
    }
  }
  
  return withStyles(styles)(ProjectRows);
}


// export default withStyles(styles)(ProjectRows);
