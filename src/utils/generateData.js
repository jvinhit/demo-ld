import { CONFIG } from "./config";

const columns = n =>
  Array.from({ length: n }, (...[, v]) => v + 1).map(vv => ({
      title: 'Col' + vv,
      dataKey: 'colkey_' + vv,
      colKey: vv,
      width: CONFIG.ITEM_WIDTH
    }),
  );

const dataSource = (n, columns) =>
  Array.from({ length: n }, (...[, v]) => v + 1).map(vv => {
    const rawRowData = {
      rowId: vv,
    };
    const rawCols = [];
    columns.forEach(v => {
      rawCols.push(v);
    });
    rawCols.forEach((v, index) => {
      rawRowData[v.dataKey] = `R${rawRowData['rowId']} - C${index + 1}`;
    });
    return rawRowData;
  });

export { columns, dataSource };
