import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './LayoutRow.css'; //eslint-disable-line
import cx from 'classnames';

import LayoutCell from '../LayoutCell';

function LayoutRow({gridVisible, minHeight, widget}) {

  return (
    <LayoutCell widget={widget} minHeight={minHeight} gridVisible={gridVisible} />
  );
}

export default withStyles(styles)(LayoutRow);
