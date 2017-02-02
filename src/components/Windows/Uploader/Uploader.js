import React, { PropTypes, Component } from 'react';
import Dropzone from 'react-dropzone';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Uploader.css'; //eslint-disable-line
import cx from 'classnames';

class Uploader extends Component {
  static propTypes = {
  };
  constructor() {
    super();
    this.openDropzone = this.openDropzone.bind(this);
  }
  openDropzone() {
    this.refs.dropzone.open();
  }
  render() {
    // const { id } = this.props;
    return (
      <Dropzone disableClick onDrop={()=>{console.log('test');}} ref="dropzone" accept="*"
                className={ cx(styles.root)} />
    );
  }
}

export default withStyles(styles)(Uploader);
