import React, { Component } from 'react';
// import withStyles from 'isomorphic-style-loader/lib/withStyles';
// import styles from './DragSourceTarget.css'; //eslint-disable-line


function dragSourceTarget(ComposedComponent) {
  return class DragSourceTarget extends Component {
    render() {
      return <ComposedComponent {...this.props} />;
    }
  };
}

export default dragSourceTarget;
