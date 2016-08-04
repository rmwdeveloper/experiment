import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './WindowsDesktop.css'; //eslint-disable-line

import WindowsDesktopItem from '../WindowsDesktopItem';

class WindowsDesktop extends Component {
  constructor() {
    super();
    this.startDragSelect = this.startDragSelect.bind(this);
    this.stopDragSelect = this.stopDragSelect.bind(this);
    this.dragSelecting = this.dragSelecting.bind(this);
    this.state = {
      dragSelecting: false,
      dragStartX: null,
      dragStartY: null
    };
  }

  startDragSelect(event) {
    const desktop = document.getElementById('desktop');
    this.dragbox = document.getElementById('dragbox');
    if (!this.dragbox) {
      this.dragbox = document.createElement('div');
      this.dragbox.setAttribute('id', 'dragbox');
      desktop.appendChild(this.dragbox);
      this.dragbox.style.border = '1px dashed black';
      this.dragbox.style.position = 'absolute';
    }

    this.dragbox.style.top = `${event.clientY}px`;
    this.dragbox.style.left = `${event.clientX}px`;
    this.dragbox.style.width = '1px';
    this.dragbox.style.height = '1px';
    desktop.addEventListener('mousemove', this.dragSelecting);

    this.setState({
      dragStartX: event.clientX,
      dragStartY: event.clientY
    });
  }
  dragSelecting(event) {
      const deltaX = event.clientX - this.state.dragStartX;
      const deltaY = event.clientY - this.state.dragStartY;

      this.dragbox.style.width = `${deltaX}px`;
      this.dragbox.style.height = `${deltaY}px`;
  }
  stopDragSelect() {
    const desktop = document.getElementById('desktop');
    desktop.removeEventListener('mousemove', this.dragSelecting);
  }
  render() {
    const { desktopItems } = this.props;
    return (
      <div id="desktop" className={styles.root} onMouseDown={this.startDragSelect} onMouseUp={this.stopDragSelect}>
        {
          desktopItems.map((desktopitem, index) => {
            return <WindowsDesktopItem  key={index} item={desktopitem}/>;
          })
        }
      </div>
    );
  }
}

WindowsDesktop.propTypes = {

};
export default withStyles(styles)(WindowsDesktop);
