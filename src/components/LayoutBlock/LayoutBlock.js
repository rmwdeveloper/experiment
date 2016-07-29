import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './LayoutBlock.css'; //eslint-disable-line

import LayoutCell from '../../components/LayoutCell';

class LayoutBlock extends Component {
  static propTypes = {
    className: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
    children: PropTypes.element.isRequired
  };

  constructor() {
    super();
    this.initialMinHeight = 100;
  }

  render() {
    const { className } = this.props;
    return <div className={className}>
      { this.props.children }
    </div>;
  }
}

export default withStyles(styles)(LayoutBlock);
