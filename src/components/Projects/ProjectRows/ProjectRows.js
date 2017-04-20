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
          { projects.map((project, index) => {
            const { description, images, link, name, role, technologies, codeLink } = project;
            return (<div key={index} className={styles.projectRow}>
              <a href={link} target="_blank"><h3 className={styles.projectName}>{name}</h3></a>
              <div className={styles.contentBlock}>
                <div className={styles.imageBlock}>
                  {images ? images.map((image, index) => {
                    return <img key={index} src={image} />;
                  }) : null }
                </div>
                <div className={styles.detailBlock}>
                  {codeLink ? <a href={codeLink}>View Code</a> : null}
                  <p>{role}</p>
                  <p>{description}</p>
                  <div className={styles.technologiesBlock}>
                    {technologies.map((technology, index) => {
                      return <span key={index} > {technology} </span>;
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
