import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './StockDashboardNavigation.css'; //eslint-disable-line
import classNames from 'classnames/bind';

function StockDashboardNavigation({toggleMode, mode, autosave}) {
  let cx = classNames.bind(styles);
  return (
    <header className={`${styles.root} col-md-12 col-sm-12 col-xs-12 col-lg-12`} role="navigation">
      <div className={`${styles.linkContainer} col-xs`}>
        <a onClick={() => toggleMode('layout')} className={cx({ link: true, active: mode === 'layout' })}>
          <span className={styles.desktop}>Layout Mode</span>
          <i className={cx('fa fa-2x fa-arrows', styles.mobile)} />
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

export default withStyles(styles)(StockDashboardNavigation);
