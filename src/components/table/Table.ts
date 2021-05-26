import ExcelComponent from '@core/ExcelComponent';
import resizeHandler from './table.resize';
import createTable from './table.template';
import TableSelection from './TableSelection';

interface MouseEventOnDiv extends MouseEvent {
  target: HTMLDivElement | null
}

class Table extends ExcelComponent {
  static className = 'excel__table';
  private selection: TableSelection | null = null;

  constructor($root: HTMLElement) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown'],
    });
  }

  public toHTML(): string {
    return createTable(20);
  }

  public init() {
    super.init();

    this.selection = new TableSelection();
  }

  protected onMousedown({target}: MouseEventOnDiv): void {
    resizeHandler(this.$root, target);
  }
}

export default Table;
