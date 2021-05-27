import ExcelComponent from '@core/ExcelComponent';
import resizeHandler from './table.resize';
import createTable from './table.template';
import TableSelection from './TableSelection';

interface MouseEventOnDiv extends MouseEvent {
  target: HTMLDivElement | null
}

class Table extends ExcelComponent {
  static className = 'excel__table';
  private selection = new TableSelection();

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

    const $cell = this.$root.querySelector<HTMLDivElement>('[data-id="0:0"]');
    this.selection.select($cell);
  }

  protected onMousedown({target}: MouseEventOnDiv): void {
    if (target?.dataset.type === 'cell') {
      this.selection.select(target);
    } else {
      resizeHandler(this.$root, target);
    }
  }
}

export default Table;
