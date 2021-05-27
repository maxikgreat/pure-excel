/**
 * convert string "1:2" to object {row: 1, col: 2}
 *
 * @param {string} id format "0:0", "1:15", "2:0"
 * @return {Object} with number fields row and col respectively
 */
const parseDatasetIdProp = (id: string): {row: number, col: number} => {
  const [row, col] = id.split(':').map((el) => +el);

  return {row, col};
};

/**
 * calculate range between target and current col/row
 *
 * @param {number} start of col/row
 * @param {number} end of col/row
 * @return {number[]} range between start and end points
 */
const getRange = (start: number, end: number): number[] => {
  if (start > end) {
    [end, start] = [start, end];
  }

  return new Array(end - start + 1)
      .fill('')
      .map((_, index) => start + index);
};

/**
 * convert coordination of target and current cells to their matrix
 *
 * @param {string} targetPosition
 * @param {string} currentPosition
 * @return {string[]} elements with parsed coords like ["1:2", "30:3", "0:0"]
 */
const calculateMatrix = (targetPosition: string, currentPosition: string): string[] => {
  const targetCoords = parseDatasetIdProp(targetPosition);
  const currentCoords = parseDatasetIdProp(currentPosition);

  const colsRange = getRange(currentCoords.col, targetCoords.col);
  const rowsRange = getRange(currentCoords.row, targetCoords.row);

  return colsRange.reduce<string[]>((acc, column) => {
    rowsRange.forEach((row) => acc.push(`${row}:${column}`));
    return acc;
  }, []);
};

export {parseDatasetIdProp, getRange, calculateMatrix};
