import React, { useState } from 'react';
import SpreedSheet from '../components/SpreedSheet';
import { columns, dataSource } from '../utils/generateData';
import { CONFIG } from '../utils/config';
import styles from './index.less';

const cols = columns(CONFIG.COLS);
const dts = dataSource(CONFIG.ROWS, cols);

export default React.memo(() => {
  const [curColumns] = useState(cols);
  const [curData] = useState(dts);
  return (
    <div className={styles.normal}>
      <SpreedSheet
        columns={curColumns}
        dataSource={curData}
        height={window.innerHeight - 50}
        width={window.innerWidth}
      />
    </div>
  );
});
