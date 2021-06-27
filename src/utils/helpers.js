const getWidths = (value = []) => {
  return value.map(column => column.width);
};

const lastWidths = source => {
  if (Array.isArray(source) && source.length) {
    return source.reduce((prev, current) => prev + current);
  }
  return 0;
};

export const renderCursor = children => {
  return children.reduce(([minColumn, maxColumn], { props: { columnIndex } }) => {
      minColumn = columnIndex < minColumn ? columnIndex: minColumn;
      maxColumn = columnIndex > maxColumn ? columnIndex : maxColumn;
      return [minColumn, maxColumn];
    }, [ Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY],
  );
};

export const computeColAttr = ({
  columnsSource,
  dataSourceSource,
  defaultItemHeight,
  scrollWidth,
  width,
  height,
}) => {
  const columns = JSON.parse(JSON.stringify(columnsSource));
  const columnWidthMapper = getWidths(columns);
  const totalWidth = lastWidths(columnWidthMapper);
  const hasHorizontalScBar = totalWidth > width;
  const heightNoScrollBar = defaultItemHeight;
  const dataSourceHeight = dataSourceSource.length * defaultItemHeight;
  const tmpHeight = height - heightNoScrollBar;
  let isShowDirScrollBar = tmpHeight < dataSourceHeight;

  const boxHeight = isShowDirScrollBar
    ? height
    : dataSourceHeight + heightNoScrollBar + (hasHorizontalScBar ? scrollWidth : 0);
  const gridHeight = hasHorizontalScBar ? boxHeight - scrollWidth : boxHeight;

  return {
    totalWidth,
    scrollWidth,
    heightNoScrollBar,
    boxHeight,
    gridHeight,
    res: lastWidths(columnWidthMapper),
    columnWidthMapper,
    columns,
  };
};

export let getScrollbarWidth = () => {
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll';
  document.body.appendChild(outer);
  const inner = document.createElement('div');
  outer.appendChild(inner);
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
  outer.parentNode.removeChild(outer);
  return scrollbarWidth;
};
