import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './StockDashboardNavigation.css'; //eslint-disable-line
import classNames from 'classnames/bind';

function StockDashboardNavigation({ toggleMode, toggleLayoutPicker,
  mode }) {
  const cx = classNames.bind(styles);
  return (
    <header className={`${styles.root} col-md-12 col-sm-12 col-xs-12 col-lg-12`} role="navigation">
      <div className={`${styles.linkContainer} col-xs`}>
        <a
          onClick={toggleLayoutPicker}
          className={cx(styles.link, { link: true })}
        >
          <span className={styles.desktop}>Pick Layout</span>
          <i className={cx('fa fa-2x fa-eye', styles.mobile)} />
        </a>
        <a
          onClick={() => toggleMode('preview')}
          className={cx(styles.link, { link: true, active: mode === 'preview' })}
        >
          <span className={styles.desktop}>Preview Mode</span>
          <i className={cx('fa fa-2x fa-eye', styles.mobile)} />
        </a>
        <a className={styles.link}>
          <span className={styles.desktop}>AutoSave</span>
          <i className={cx('fa fa-2x fa-save', styles.mobile)} />
        </a>
      </div>
    </header>
  );
}

StockDashboardNavigation.propTypes = {
  toggleMode: PropTypes.func,
  openLayoutPicker: PropTypes.func,
  mode: PropTypes.string,
  // addColumn: PropTypes.func,
  // addRow: PropTypes.func,
  // gridVisible: PropTypes.bool,
  autosave: PropTypes.bool,
  // toggleGrid: PropTypes.func
};
export default withStyles(styles)(StockDashboardNavigation);
