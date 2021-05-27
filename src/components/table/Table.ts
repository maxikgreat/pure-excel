import ExcelComponent from '@core/ExcelComponent';
import TableSelection from './TableSelection';
import resizeHandler from './table.resize';
import createTable from './table.template';
import {calculateMatrix} from '@components/table/table.functions';

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

  protected onMousedown({target, shiftKey}: MouseEventOnDiv): void {
    if (!target) return;

    if (target.dataset.type === 'cell' && this.selection.current) {
      if (shiftKey) {
        const $cells = calculateMatrix(
          target.dataset.id as string,
          this.selection.current.dataset.id as string,
        )
            .map((id) => this.$root.querySelector<HTMLDivElement>(`[data-id="${id}"]`));

        this.selection.selectGroup($cells as HTMLDivElement[]);
      } else {
        this.selection.select(target);
      }
    } else {
      resizeHandler(this.$root, target);
    }
  }
}

export default Table;
