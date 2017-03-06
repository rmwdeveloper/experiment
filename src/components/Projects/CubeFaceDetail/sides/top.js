import React from 'react';
import cx from 'classnames';


export default function Top({style, url, image, network}) {
  const iconClasses = cx(style.socialNetwork, {'inactive': !url });

  return <div>Top</div>;
}
