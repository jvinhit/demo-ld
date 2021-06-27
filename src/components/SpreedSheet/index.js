import React, { useState, useEffect, useRef } from 'react';
import { CONFIG } from '../../utils/config';
import { getScrollbarWidth, computeColAttr } from '../../utils/helpers';
import classnames from 'classnames';
import DataSource from '../Wrapper';
import styles from './index.less';

const scrollWidth = getScrollbarWidth();
// holder/ keep scroller at position when editable
let scrollTop = 0;
let scrollLeft = 0;

const SpreadSheet = ({
  columns: columnsSource = [],
  dataSource: dataOriginal = [],
  height,
  width,
}) => {
  const [columns, setColumns] = useState({});
  const [dataSource, setDataSource] = useState([]);

  const containerRef = useRef(null);
  const cellRef = useRef(null);
  const variableSizeGridRef = useRef(null);

  const [trueWidth, trueHeight] = [width - CONFIG.GUTTER_LR * 2, height - CONFIG.MG_T - CONFIG.MG_B];

  useEffect(() => {
    let tmpDataSource = [];
    if (dataOriginal.length) {
      tmpDataSource = JSON.parse(JSON.stringify(dataOriginal));
    }
    setDataSource(tmpDataSource);
    handleColumns(columnsSource, tmpDataSource, trueWidth, trueHeight);
  }, [columnsSource, dataOriginal, trueWidth, trueHeight]);

  const handleColumns = (columnsSource, dataSourceSource, width, height) => {
    const params = {
      columnsSource,
      dataSourceSource,
      defaultItemWidth: CONFIG.ITEM_WIDTH,
      defaultItemHeight: CONFIG.ITEM_HEIGHT,
      scrollWidth,
      width,
      height,
    };
    setColumns(computeColAttr(params));
  };

  const changeColumns = (e, index) => {
    handleColumns(e, dataSource, trueWidth, trueHeight);
    adjustTable(index);
  };

  const changeTable = e => {
    handleColumns(columns.columns, e, trueWidth, trueHeight);
    setDataSource(JSON.parse(JSON.stringify(e)));
  };

  const adjustTable = index => {
    if (variableSizeGridRef.current) {
      variableSizeGridRef.current.resetAfterColumnIndex({
        index,
        shouldForceUpdate: false,
      });
    }
  };
  const onScroll = (param) => {
    if (!Object.keys(columns).length || !variableSizeGridRef.current) return;
    scrollLeft = param.scrollLeft;
    scrollTop = param.scrollTop;
  }
  return (
      <div className={classnames({ [styles.gridContainer]: true })} ref={containerRef}>
        <DataSource
          dataSource={dataSource}
          width={trueWidth}
          height={trueHeight}
          columnInfo={columns}
          changeColumns={changeColumns}
          changeTable={changeTable}
          onScroll={onScroll}
          scrollLeft={scrollLeft}
          scrollTop={scrollTop}
          nodeRefs={{ containerRef, variableSizeGridRef, cellRef }}
        />
      </div>
  );
};

export default React.memo(SpreadSheet);
