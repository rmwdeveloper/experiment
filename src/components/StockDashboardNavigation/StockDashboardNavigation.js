import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './StockDashboardNavigation.css'; //eslint-disable-line
import classNames from 'classnames/bind';

function StockDashboardNavigation({toggleMode, mode, addColumn, addRow, gridVisible, autosave, toggleGrid}) {
  let cx = classNames.bind(styles);
  return (
    <header className={`${styles.root} col-md-12 col-sm-12 col-xs-12 col-lg-12`} role="navigation">
      <div className={`${styles.linkContainer} col-xs`}>
        <a onClick={() => toggleMode('layout')} className={cx({ link: true, active: mode === 'layout' })}>
          <span className={styles.desktop}>Add Mode</span>
          <i className={cx('fa fa-2x fa-arrows', styles.mobile)} />
        </a>
        <a onClick={toggleGrid} className={cx({ link: true, active: gridVisible })}>
          <span className={styles.desktop}>Grid</span>
          <i className={cx('fa fa-2x fa-table', styles.mobile)} />
        </a>
        <a onClick={addColumn} className={cx({ link: true })}>
          <span className={styles.desktop}>Add Column</span>
          <i className={cx('fa fa-2x fa-columns', styles.mobile)} />
        </a>
        <a onClick={addRow} className={cx({ link: true })}>
          <span className={styles.desktop}>Add Row</span>
          <i className={cx('fa fa-2x fa-navicon', styles.mobile)} />
        </a>
        <a onClick={() => toggleMode('preview')} className={cx(styles.link, { link: true, active: mode === 'preview' })}>
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
  mode: PropTypes.func,
  addColumn: PropTypes.func,
  addRow: PropTypes.func,
  gridVisible: PropTypes.bool,
  autosave: PropTypes.bool,
  toggleGrid: PropTypes.func
};
export default withStyles(styles)(StockDashboardNavigation);
