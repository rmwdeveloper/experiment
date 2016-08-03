import React, { Component, className, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './DisplayEditingMode.css'; //eslint-disable-line
import Perf from 'react-addons-perf';
import cx from 'classnames';

class ReactPerfButton extends Component {
  static propTypes = {
    className: PropTypes.string
  };

  constructor() {
    super();
    this.toggleDisplayEditMode = this.toggleDisplayEditMode.bind(this);
    this.updateMediaQueryDisplay = this.updateMediaQueryDisplay.bind(this);
    this.state = {
      showingMediaBreakpoints: false,
      width: 320
    };
  }
  updateMediaQueryDisplay(event) {
    this.setState({ width: event.target.innerWidth});
  }
  toggleDisplayEditMode() {
    this.setState({ showingMediaBreakpoints: !this.state.showingMediaBreakpoints });
  }
  componentDidMount() {
    window.onresize =  this.updateMediaQueryDisplay;
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.state.width !== nextState.width;
  }
  render() {
    const { className } = this.props;
    const { width } = this.state;
    return (
      <div className={cx(className, styles.root)}>
        {(() => {
          switch (true) {
            case (width < 320):
              return <span>None</span>;
              break;
            case (width <= 479 && width >= 320):
              return <span>Phone Retina</span>;
              break;
            case (width <= 567 && width >= 480):
              return <span>Phone</span>;
              break;
            case (width <= 767 && width >= 568):
              return <span>Phone Landscape</span>;
              break;
            case (width <= 991 && width >= 768):
              return <span>Tablet</span>;
              break;
            case (width <= 1023 && width >= 992):
              return <span>Desktop</span>;
              break;
            case (width <= 1199 && width >= 1024):
              return <span>Tablet Landscape / Desktop</span>;
              break;
            case (width >= 1200):
              return <span>Widescreen</span>;
              break;
            default:
              return 'Resize';
          }
        })()}
      </div>
    );
  }
}

export default withStyles(styles)(ReactPerfButton);
