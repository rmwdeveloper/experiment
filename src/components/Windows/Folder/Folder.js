import React, { PropTypes } from 'react';
import styles from './Folder.css'; //eslint-disable-line
import withStyles from 'isomorphic-style-loader/lib/withStyles';


function Folder({openedFile, entities}) {
  const folderContents = entities[openedFile.entityId].contents.map(entityId => {
    return entities[entityId];
  });

  return (
    <div className={styles.root}>
      Windows Folder fasdf
    </div>
  );
}

Folder.propTypes = {
  entityID: PropTypes.number
};
export default withStyles(styles)(Folder);
