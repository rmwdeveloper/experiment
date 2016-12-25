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
    this.setState({ width: window.innerWidth});
    window.addEventListener('resize', this.updateMediaQueryDisplay);
  }
  componentWillUnmount(){
    window.removeEventListener('resize', this.updateMediaQueryDisplay);
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
            case (width <= 479 && width >= 320):
              return <span>phoneRetina</span>;
            case (width <= 567 && width >= 480):
              return <span>Phone</span>;
            case (width <= 767 && width >= 568):
              return <span>phoneLandscape</span>;
            case (width <= 991 && width >= 768):
              return <span>tablet</span>;
            case (width <= 1023 && width >= 992):
              return <span>desktop</span>;
            case (width <= 1199 && width >= 1024):
              return <span>tabletLandscape / desktop</span>;
            case (width >= 1200):
              return <span>widescreen</span>;
            default:
              return 'Resize the window';
          }
        })()}
      </div>
    );
  }
}

export default withStyles(styles)(ReactPerfButton);
