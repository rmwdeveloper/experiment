import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Home.css';


const title = 'Robert Westenberger Portfolio';
function Home(props, context) {
  context.setTitle(title);
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        Hello World
      </div>
    </div>
  );
}

Home.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(styles)(Home);
