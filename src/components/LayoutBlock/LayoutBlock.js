import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './LayoutBlock.css'; //eslint-disable-line

class LayoutBlock extends Component {
  static propTypes = {
    className: Proptypes.string.isRequired,
    height: PropTypes.number.isRequired,
    children: PropTypes.element.isRequired
  };

  constructor() {
    super();
    this.initialMinHeight = 100;
  }

  render() {
    return <div>Layout Block</div>
  }
}

export default withStyles(styles)(LayoutBlock);
