import React from 'react';
import { Item } from '../Item';

const Cell = props => {
  const {
    rowIndex,
    columnIndex,
    style,
    dataSource,
    columnInfo,
    changeTable,
    changeColumns,
  } = props;

  const tmp = React.useMemo(() => columnInfo?.columns?.[columnIndex], [columnInfo, columnIndex]);
  return (
    <div style={style}>
      <Item
        data={dataSource[rowIndex]}
        {...tmp}
        change={changeTable}
        changeColumns={changeColumns}
        source={dataSource}
        rowIndex={rowIndex}
        columnInfo={columnInfo}
      />
    </div>
  );
};

export default React.memo(Cell);
