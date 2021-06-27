import React from 'react';
import HeaderItem from './item';
import styles from './index.less';

const headerBuilder = (minColumn, maxColumn, columnWidth, stickyHeight, columns) => {
  const headerCols = [];
  let left = [0];
  let pos = 0;
  for (let c = 1; c <= maxColumn; c++) {
    pos += columnWidth(c - 1);
    left.push(pos);
  }
  for (let i = minColumn; i <= maxColumn; i++) {
    headerCols.push({
      style: { height: stickyHeight, width: columnWidth(i), left: left[i] },
      data: columns[i],
      index: i,
    });
  }
  return headerCols;
};
const dStyle = (width, height) => {
  const params = {};
  if (width) params.width = width;
  if (height) params.height = height;
  return params;
};

const StickyHeader = ({
  stickyHeight,
  columnInfo,
  dataSource,
  minColumn,
  maxColumn,
  columnWidth,
  variableSizeGridRef,
  changeColumns,
  changeTable,
  containerRef,
}) => {
  const { res, columns } = columnInfo;
  return (
    <div className={styles.header}>
      <div className={styles.scrollable} style={dStyle(res)}>
        {headerBuilder(minColumn, maxColumn, columnWidth, stickyHeight, columns).map(
          ({ index, data, style }, i) => (
            <div className={styles.item} key={i} style={style}>
              <HeaderItem
                key={data.dataKey}
                variableSizeGridRef={variableSizeGridRef}
                index={index}
                style={dStyle(style.width)}
                mainColumns={data}
                data={columnInfo}
                dataSource={dataSource}
                change={changeColumns}
                changeTable={changeTable}
                containerRef={containerRef}
              />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default React.memo(StickyHeader);
