import React from 'react';
import classnames from 'classnames';
import styles from './item.less';

export default React.memo(props => {
  const { style, mainColumns } = props;
  return (
    <div style={style}>
      <div className={styles.columnsItem}>
        <div
          key={mainColumns.dataKey}
          title={mainColumns.title}
          className={classnames(styles.horizontalScroll)} >
          {mainColumns.title}
        </div>
      </div>
    </div>
  );
});
