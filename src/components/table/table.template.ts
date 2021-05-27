const CODES = {
  A: 65,
  Z: 90,
};

/**
 * return a function that return plain empty excel cell
 *
 * @param {number} rowIndex index
 * @return {Function} with .map arguments
 */
const createCell = (rowIndex: number) => (_: string, colIndex: number): string => {
  return `
    <div
      contenteditable
      class="cell"
      data-type="cell"
      data-column="${colIndex}"
      data-id="${rowIndex}:${colIndex}"
    ></div>
  `;
};

/**
 * return an excel column with A, B, C, D, E values
 *
 * @param {string} elem
 * @param {number} index of elem
 * @return {string} column template
 */
const createCol = (elem: string, index: number): string => {
  return `
    <div class="column" data-type="resizable" data-column="${index}">
      ${elem}
      <div class="column-resize" data-resize="column"></div>
    </div>
  `;
};

/**
 * return an excel row with info (numbers) and content (cells)
 *
 * @param {string} content will be inserted in 'row-data' div
 * @param {number} index will be inserted in 'row-info' div if exists
 * @return {string} row template
 */
const createRow = (content: string, index?: number): string => {
  return `
    <div class="row" data-type="resizable">
      <div class="row-info">
        ${index ?? ''}
        ${index ? '<div class="row-resize" data-resize="row"></div>' : ''}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `;
};

/**
 * return a part of a row
 *
 * @param {Function} callback for each iteration
 * @return {string} line of columns template
 */
const createColsArray = (callback: Function): string =>
  new Array(CODES.Z - CODES.A + 1)
      .fill('')
      .map((_, index) => String.fromCharCode(CODES.A + index))
      .map(callback as (value: string, index: number, array: string[]) => unknown)
      .join('');


export default function(rowsCount: number): string {
  const rows: string[] = [];

  const cols = createColsArray(createCol);

  rows.push(createRow(cols));

  for (let i = 0; i < rowsCount; i++) {
    const cells = createColsArray(createCell(i));
    rows.push(createRow(cells, i + 1));
  }

  return rows.join('');
}
