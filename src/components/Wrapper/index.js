import React, { forwardRef } from 'react';
import { VariableSizeGrid } from 'react-window';
import classnames from 'classnames';
import StickyHeader from '../Header';
import Cell from '../Cell';
import { renderCursor } from '../../utils/helpers';
import { CONFIG } from '../../utils/config';
import styles from './index.less';

export default React.memo(props => {
  if (!Object.keys(props.columnInfo).length) {
    return null;
  }
  const {
    className,
    dataSource,
    width,
    columnInfo,
    changeColumns,
    changeTable,
    nodeRefs,
    onScroll,
    scrollTop,
    scrollLeft,
  } = props;

  const { containerRef, variableSizeGridRef, cellRef } = nodeRefs;

  const {
    heightNoScrollBar,
    totalWidth,
    boxHeight: height,
    gridHeight,
    columnWidthMapper,
    res,
  } = columnInfo;

  const stickyHeight = heightNoScrollBar;
  const columnCount = columnWidthMapper.length;
  const rowCount = dataSource.length;
  const columnWidth = index => columnWidthMapper[index];
  const rowHeight = () => CONFIG.ITEM_HEIGHT;

  const innerElementType = forwardRef(({ children, ...rest }, ref) => {
    const [minColumn, maxColumn] = renderCursor(children);
    const containerStyle = { width: totalWidth, height: rest.style.height + heightNoScrollBar };
    const containerHeight = gridHeight - heightNoScrollBar;
    const gridDataContainerStyle = { width: res, height: containerHeight };
    return (
      <div ref={ref} className={styles.container} style={containerStyle}>
        <StickyHeader
          columnWidth={columnWidth}
          stickyHeight={stickyHeight}
          columnInfo={columnInfo}
          dataSource={dataSource}
          minColumn={minColumn}
          maxColumn={maxColumn}
          containerRef={containerRef}
          variableSizeGridRef={variableSizeGridRef}
          changeColumns={changeColumns}
          changeTable={changeTable}
        />
        <div className={styles.dataBox} style={gridDataContainerStyle}>
          {children}
        </div>
      </div>
    );
  });
  return (
    <div className={classnames(styles.tbody, className)} style={{ height, width }} ref={cellRef}>
      <VariableSizeGrid
        ref={variableSizeGridRef}
        columnWidth={columnWidth}
        innerElementType={innerElementType}
        className={CONFIG.GRID_CONTAINER_CLASS_NAME}
        columnCount={columnCount}
        rowCount={rowCount}
        height={height}
        width={width}
        rowHeight={rowHeight}
        onScroll={onScroll}
        initialScrollLeft={scrollLeft}
        initialScrollTop={scrollTop}
      >
        {props => (
          <Cell
            {...props}
            dataSource={dataSource}
            columnInfo={columnInfo}
            changeTable={changeTable}
            changeColumns={changeColumns}
          />
        )}
      </VariableSizeGrid>
    </div>
  );
});
