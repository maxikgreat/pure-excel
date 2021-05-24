import ExcelComponent from '@core/ExcelComponent';
import createTable from './table.template';

class Table extends ExcelComponent {
  static className = 'excel__table';

  public toHTML(): string {
    return createTable(20);
  }
}

export default Table;
