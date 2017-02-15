import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './FileIcon.css'; //eslint-disable-line
import cx from 'classnames';
import { windowsClickables } from '../../../constants/windows';
import { constructDownloadURL } from '../../../core/aws';
import interact from 'interactjs';


class FileIcon extends Component {
  static propTypes = {
    item: PropTypes.object,
    openFile: PropTypes.func
  };

  constructor() {
    super();
    this.dragMoveListener = this.dragMoveListener.bind(this);
    this.dragStartListener = this.dragStartListener.bind(this);
    this.latestTap = null;
    this.doubleTap = this.doubleTap.bind(this);
  }

  dragMoveListener(event) {
    const target = event.target;
    let icons = [event.target];
    if (event.target.classList.contains('selected')) {
      icons = document.getElementsByClassName('fileIcon selected');
      console.log('selected', icons);
    }


    // keep the dragged position in the data-x/data-y attributes
    const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // console.log(icons.length);
    // translate the element
    // target.style.webkitTransform =
    //   target.style.transform =
    //     'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    for(let iterator = 0; iterator < icons.length; iterator++) {
      const icon = icons[iterator];
      icon.setAttribute('data-x', x);
      icon.setAttribute('data-y', y);
      icon.style.webkitTransform =
        icon.style.transform =
          'translate(' + x + 'px, ' + y + 'px)';
    }
    // target.setAttribute('data-x', x);
    // target.setAttribute('data-y', y);
  }
  dragStartListener(event) {
    const target = event.target;
    const { item, parentIndex } = this.props;
    console.log(' drag start', this.state);
    target.setAttribute('data-index', item.index);
    target.setAttribute('data-parentIndex', parentIndex);
  }
  doubleTap() {
    const { openFile, item } = this.props;
    const now = new Date().getTime();
    const timesince = now - this.mylatesttap;
    if ((timesince < 600) && (timesince > 0)) {
      openFile(item.index);
    }
    else {
      console.log('no double tap');
    }

    this.mylatesttap = new Date().getTime();
  }
  componentDidMount() {
    interact('.fileIcon').draggable({
      inertia: true,
      onmove: this.dragMoveListener,
      onstart: this.dragStartListener,
    });
  }

  render() {
    const { item, className, clickClass, selected, openFile } = this.props;
    let href = '';
    const style = { background: `url(${item.metadata.icon})` };
    const elementType = Boolean(item.metadata.isUpload) ? 'a' : 'div';

    const loadingBorder = (<svg className={styles.iconSVG} width="110" height="110" key={3}>]
      <rect width="100%" height="100%" fill="transparent"
            stroke="black"/>
      <path id={`progress${item.nodeIndex}`}
            style={{strokeDasharray: 440, strokeDashoffset: 440 * (1 - item.metadata.progress) }}
            d="M0 0 H 110 V 110 H 110 0 V 110 0" stroke="green" strokeWidth="5" fill="transparent"/>
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
      selectedStyle.outline = '2px solid red';
      // selectedStyle.outline = '2px solid rgb(115, 128, 140)';
    }
    if (item.metadata.awsKey) {
      href = constructDownloadURL(item.metadata.awsKey);
    }
    const children = [
      <div key={0} style={style} data-clickClass={windowsClickables.desktopItemIcon} data-index={item.index}
           className={cx(styles.icon)}/>,
      <span key={1} data-clickClass={windowsClickables.desktopItemName} data-index={item.index}
            className={styles.directoryName}> {item.name}</span>
    ];
    if (item.metadata.loading) {
      children.push(loadingBorder);
    }
    return React.createElement(elementType, {
      style: selectedStyle, download: Boolean(item.metadata.isUpload),
      href: Boolean(item.metadata.awsKey) ? href : null, key: item.nodeIndex,
      'data-clickClass': windowsClickables[clickClass], 'data-topClickable': true, 'data-index': item.index,
      onDoubleClick: () => {
        openFile(item.index);
      }, onTouchStart: this.doubleTap, className: cx(className, styles.root, 'fileIcon')
    }, children);

  }
}

// const fileIconSource = {
//   beginDrag(props) {
//     Dropzone.instances.forEach(instance => {
//       instance.disable();
//     });
//     return {index: props.item.index, selected: props.selected, parentIndex: props.parentIndex};
//   },
//   endDrag(props, monitor, component) {
//     Dropzone.instances.forEach(instance => {
//       instance.enable();
//     });
//
//     if (!monitor.didDrop()) {
//       return;
//     }
//
//     const item = monitor.getItem();
//     const dropResult = monitor.getDropResult();
//
//     if (item !== dropResult && (dropResult.canDrop)) {
//       if(item.selected) {
//         props.moveFiles(item.parentIndex, dropResult.index);
//       } else{
//         props.moveFile(item.index, dropResult.index);
//       }
//     }
//     if (props === component) {
//       return;
//     }
//   }
// };
// function collectSource(connect, monitor) {
//   return {
//     connectDragSource: connect.dragSource(),
//     isDragging: monitor.isDragging()
//   };
// }
//
// const fileIconTarget = {
//   drop(props, monitor) {
//     if ( monitor.didDrop() ) {
//       return null;
//     }
//
//     return { index: props.item.index, canDrop: props.item.hasOwnProperty('children') };
//   }
// };
//
// function collectTarget(connect, monitor) {
//   return {
//     connectDropTarget: connect.dropTarget(),
//     isOver: monitor.isOver()
//   };
// }

export default withStyles(styles)(FileIcon);

