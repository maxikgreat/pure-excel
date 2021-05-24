const CODES = {
  A: 65,
  Z: 90,
};

/**
 * return a plain empty excel cell
 *
 * @return {string} cell template
 */
const createCell = (): string => {
  return `
    <div class="cell" contenteditable></div>
  `;
};

/**
 * return an excel column with A, B, C, D, E values
 *
 * @param {string} elem
 * @return {string} column template
 */
const createCol = (elem: string): string => {
  return `
    <div class="column">${elem}</div>
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
    <div class="row">
      <div class="row-info">${index ?? ''}</div>
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
    const cells = createColsArray(createCell);
    rows.push(createRow(cells, i + 1));
  }

  return rows.join('');
}
