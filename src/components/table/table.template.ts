
const CODES = {
  A: 65,
  Z: 90,
};

const createCell = (): string => {
  return `
    <div class="cell" contenteditable>B2</div>
  `;
};

const createCol = (elem: string): string => {
  return `
    <div class="column">${elem}</div>
  `;
};

const createRow = (content?: string): string => {
  return `
    <div class="row">
      <div class="row-info"></div>
      <div class="row-data">${content}</div>
    </div>
  `;
};

const createColsArray = (callback: Function): string =>
  new Array(CODES.Z - CODES.A + 1)
      .fill('')
      .map((_, index) => String.fromCharCode(CODES.A + index))
      .map(callback as (value: string, index: number, array: string[]) => unknown)
      .join('');


export default function(rowsCount: number): string {
  const rows: string[] = [];

  const cols = createColsArray(createCol);
  const cells = createColsArray(createCell);

  rows.push(createRow(cols));

  for (let i = 0; i < rowsCount; i++) {
    rows.push(createRow(cells));
  }

  return rows.join('');
}
