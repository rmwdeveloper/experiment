import React, { PropTypes, Component} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './CubeFaceDetail.css'; //eslint-disable-line
import cx from 'classnames';


class CubeFaceDetail extends Component {
  render() {
    const { id, backgroundColor, section } = this.props;
    return (<div id={id} style={{backgroundColor}}>{section} </div>);
  }

}


export default withStyles(styles)(CubeFaceDetail);
