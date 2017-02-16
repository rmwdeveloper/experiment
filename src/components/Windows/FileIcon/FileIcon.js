import React, { PropTypes, Component } from 'react';
// import { DragSource as dragSource, DropTarget as dropTarget } from 'react-dnd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './FileIcon.css'; //eslint-disable-line
import cx from 'classnames';
import { windowsClickables } from '../../../constants/windows';
import { constructDownloadURL } from '../../../core/aws';
import flow from 'lodash.flow';
import interact from 'interactjs';



class FileIcon extends Component {
  static propTypes = {
    item: PropTypes.object,
    openFile: PropTypes.func
  };
  constructor() {
    super();
    this.x = 0;
    this.y = 0;
    this.latestTap = null;
    this.doubleTap = this.doubleTap.bind(this);
    this.moveListener = this.moveListener.bind(this);
    this.startMoveListener = this.startMoveListener.bind(this);
    this.endMoveListener = this.endMoveListener.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }
  onDrop(event){
    const {moveFiles, moveFile, item} = this.props;
    console.log('dropped on fileicon');
    const index = event.relatedTarget.getAttribute('data-index');
    const name = event.relatedTarget.getAttribute('data-name');
    const selected = event.relatedTarget.getAttribute('data-selected');
    const parentIndex = event.relatedTarget.getAttribute('data-parentIndex');

    console.log(event.relatedTarget, event.target);
    if(selected === 'true') { //set attribute true sets it to 'true'...
      moveFiles(parentIndex, event.target.getAttribute('data-index'));
    } else{
      moveFile(event.relatedTarget.getAttribute('data-index'), event.target.getAttribute('data-index'));
    }

  }
  doubleTap() {
    const { openFile, item } = this.props;
    const now = new Date().getTime();
    const timesince = now - this.mylatesttap;
    if ((timesince < 600) && (timesince > 0)){
      openFile(item.index);
    }
    else{
      console.log('no double tap');
    }

    this.mylatesttap = new Date().getTime();
  }
  startMoveListener(event){
    // const { target } = event;
    // const {selected, item: {index, name}, parentIndex} = this.props;
    //
    // target.setAttribute('data-index', index);
    // target.setAttribute('data-name', name);
    // target.setAttribute('data-selected', selected);
    // target.setAttribute('data-parentIndex', parentIndex);
  }
  moveListener(event) {
    const target = event.target,
    // keep the dragged position in the data-x/data-y attributes
      x = (parseFloat(this.x || 0) + event.dx),
      y = (parseFloat(this.y || 0) + event.dy);

    // translate the element
    target.style.webkitTransform =
      target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)';
    target.style.opacity = 0.25;
    // update the posiion attributes
    this.x = x;
    this.y = y;
  }
  endMoveListener(event) {
    const target = event.target;
    target.style.webkitTransform =
      target.style.transform = 'none';
    target.style.opacity = 1;
    this.x = 0;
    this.y = 0;

    // target.setAttribute('data-index', index);
    // target.setAttribute('data-selected', false);
    // target.setAttribute('data-parentIndex', parentIndex);

  }
  componentDidMount() {
    interact('.fileIcon').dropzone({
      accept: '.fileIcon',
      overlap: 0.50,
      ondrop: this.onDrop
    });


    interact('.fileIcon').draggable({
      inertia: false,
      onmove: this.moveListener,
      onstart: this.startMoveListener,
      onend: this.endMoveListener
    });
  }
  render() {
    const { item, connectDragSource, connectDropTarget, className, clickClass, selected, openFile } = this.props;
    let href = '';
    const style = {background: `url(${item.metadata.icon})`};
    const elementType = Boolean(item.metadata.isUpload) ? 'a' : 'div';

    const loadingBorder = (<svg className={styles.iconSVG} width="110" height="110" key={3}>]
      <rect width="100%" height="100%" fill="transparent"
            stroke="black"/>
      <path id={`progress${item.nodeIndex}`} style={{strokeDasharray: 440, strokeDashoffset: 440 * (1 - item.metadata.progress) }} d="M0 0 H 110 V 110 H 110 0 V 110 0" stroke="green" strokeWidth="5" fill="transparent" />
    </svg>);
    if (item.metadata.sprite) {
      style.backgroundSize = '425px';
      style.backgroundPosition = item.metadata.backgroundPosition;
    }
    if (item.metadata.iconOpacity) {
      style.opacity = item.metadata.iconOpacity;
    }
    const selectedStyle = {};
    if (selected) {
      selectedStyle.backgroundColor = 'rgba(66,85,101,0.25)';
      selectedStyle.outline = '2px solid rgb(115, 128, 140)';
    }
    if (item.metadata.awsKey) {
      href = constructDownloadURL(item.metadata.awsKey);
    }
    const children = [
      <div key={0} style={style} data-clickClass={windowsClickables.desktopItemIcon} data-index={item.index} className={cx(styles.icon)} />,
      <span key={1} data-clickClass={windowsClickables.desktopItemName} data-index={item.index} className={styles.directoryName}> {item.name}</span>
    ];
    if ( item.metadata.loading) {
      children.push(loadingBorder);
    }
    return (
      React.createElement(elementType, {style: selectedStyle, download: Boolean(item.metadata.isUpload),
        href: Boolean(item.metadata.awsKey) ? href : null, key: item.nodeIndex,
        'data-clickClass':windowsClickables[clickClass], 'data-topClickable': true, 'data-index': item.index,
        onDoubleClick: () => {openFile(item.index);} , onTouchStart: this.doubleTap, className: cx(className, styles.root, 'fileIcon', {selected}) }, children)
    );
  }
}


const fileIconSource = {
  beginDrag(props) {
    Dropzone.instances.forEach(instance => {
      instance.disable();
    });
    return {index: props.item.index, selected: props.selected, parentIndex: props.parentIndex};
  },
  endDrag(props, monitor, component) {
    Dropzone.instances.forEach(instance => {
      instance.enable();
    });

    if (!monitor.didDrop()) {
      return;
    }

    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    
    if (item !== dropResult && (dropResult.canDrop)) {
      if(item.selected) {
        props.moveFiles(item.parentIndex, dropResult.index);
      } else{
        props.moveFile(item.index, dropResult.index);
      }
    }
    if (props === component) {
      return;
    }
  }
};
function collectSource(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

const fileIconTarget = {
  drop(props, monitor) {
    if ( monitor.didDrop() ) {
      return null;
    }

    return { index: props.item.index, canDrop: props.item.hasOwnProperty('children') };
  }
};

function collectTarget(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

export default withStyles(styles)(FileIcon);

