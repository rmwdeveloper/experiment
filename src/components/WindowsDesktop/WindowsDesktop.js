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
    this.checkForOverlap = this.checkForOverlap.bind(this);
    this.dragbox = null;
    this.icons = null;
    this.state = {
      dragSelecting: false,
      dragStartX: null,
      dragStartY: null
    };
  }
  componentDidMount() {
    this.icons = document.getElementsByClassName('desktopIcon');
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
  checkForOverlap() {
    const dragboxRect = this.dragbox.getBoundingClientRect();
    for (let i = 0; i < this.icons.length; i++) {
      const icon = this.icons[i].getBoundingClientRect();
      const overlapping = !(dragboxRect.right < icon.left ||
      dragboxRect.left > icon.right ||
      dragboxRect.bottom < icon.top ||
      dragboxRect.top > icon.bottom);

      if ( overlapping ) {
        console.log(overlapping);
      }
    }
  }

  dragSelecting(event) {
    const deltaX = event.clientX - this.state.dragStartX;
    const deltaY = event.clientY - this.state.dragStartY;

    if ( deltaY < 0 && deltaX < 0 ) {
      this.dragbox.style.transform = `rotateX(180deg) rotateY(180deg) translateY(${Math.abs(deltaY)}px) translateX(${Math.abs(deltaX)}px)`;
    } else if ( deltaX < 0 ) {
      this.dragbox.style.transform = `rotateX(180deg) translateX(${deltaX}px)`;
    } else if ( deltaY < 0 ){
      this.dragbox.style.transform = `rotateY(180deg) translateY(${deltaY}px)`;
    }

    this.dragbox.style.width = `${Math.abs(deltaX)}px`;
    this.dragbox.style.height = `${Math.abs(deltaY)}px`;
    this.checkForOverlap();
  }

  stopDragSelect() {
    const desktop = document.getElementById('desktop');
    desktop.removeEventListener('mousemove', this.dragSelecting);
    this.setState({
      dragSelecting: false,
      dragStartX: null,
      dragStartY: null
    });
    this.dragbox.remove();
    this.dragbox.border = 'none';
    this.dragbox.width = '1px';
    this.dragbox.height = '1px';
    this.dragbox.transform = 'none';
    this.dragbox.left = 0;
    this.dragbox.top = 0;
  }

  render() {
    const { desktopItems } = this.props;
    return (
      <div id="desktop" className={styles.root} onMouseDown={this.startDragSelect} onMouseUp={this.stopDragSelect}>
        {
          desktopItems.map((desktopitem, index) => {
            return <WindowsDesktopItem key={index} item={desktopitem}/>;
          })
        }
      </div>
    );
  }
}

WindowsDesktop.propTypes = {};
export default withStyles(styles)(WindowsDesktop);
