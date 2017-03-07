import React, { PropTypes, Component} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './CubeFaceDetail.css'; //eslint-disable-line
import cx from 'classnames';
import sideMarkupRegistry from './sideMarkupRegistry';

class CubeFaceDetail extends Component {

  render() {
    const { id, backgroundColor, section, faceShown } = this.props;
    let face = '';
    if (faceShown) {
       face = React.createElement(sideMarkupRegistry[faceShown], {...this.props});
    }

    return (<div className={styles.root} id={id} style={{backgroundColor}}>{faceShown ? face : null}</div>);
  }

}


export default withStyles(styles)(CubeFaceDetail);
