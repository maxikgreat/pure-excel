import ExcelComponent from '@core/ExcelComponent';
import TableSelection from './TableSelection';
import resizeHandler from './table.resize';
import createTable from './table.template';
import {calculateMatrix, getNextSelector} from '@components/table/table.functions';
import Emitter from '@core/Emitter';

interface MouseEventOnDiv extends MouseEvent {
  target: HTMLDivElement | null
}

export type EventKey =
  'Enter'|
  'Tab' |
  'ArrowLeft' |
  'ArrowRight' |
  'ArrowUp' |
  'ArrowDown'


class Table extends ExcelComponent {
  static className = 'excel__table';
  private selection = new TableSelection();

  constructor($root: HTMLElement, emitter: Emitter) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      emitter,
    });
  }

  public toHTML(): string {
    return createTable(20);
  }

  private selectCell($cell: HTMLDivElement | null) {
    this.selection.select($cell);
    this.emit<typeof $cell>('table:select', $cell);
  }

  public init() {
    super.init();

    const $cell = this.$root.querySelector<HTMLDivElement>('[data-id="0:0"]');
    this.selectCell($cell);

    this.subscribe<string>('formula:input', (text) => {
      const selectionElement = this.selection.current;
      if (!selectionElement) return;

      selectionElement.textContent = text;
    });

    this.subscribe<undefined>('formula:done', () => {
      this.selection.current?.focus();
    });
  }

  protected onMousedown({target, shiftKey}: MouseEventOnDiv): void {
    if (!target) return;

    if (target.dataset.type === 'cell' && this.selection.current) {
      if (shiftKey) {
        const targetId = target.dataset.id as string;
        const currentId = this.selection.current.dataset.id as string;

        const $cells = calculateMatrix(targetId, currentId)
            .map((id) => this.$root.querySelector<HTMLDivElement>(`[data-id="${id}"]`));

        this.selection.selectGroup($cells as HTMLDivElement[]);
      } else {
        this.selection.select(target);
      }
    } else {
      resizeHandler(this.$root, target);
    }
  }

  protected onKeydown(event: KeyboardEvent) {
    const {key} = event;

    const keys: EventKey[] = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown',
    ];

    if (!keys.includes(key as EventKey) || !this.selection.current) return;

    event.preventDefault();
    const id = this.selection.current.dataset.id as string;

    const nextSelector = getNextSelector(key as EventKey, id);

    const target = this.$root.querySelector<HTMLDivElement>(nextSelector);

    this.selectCell(target);
  }

  protected onInput(event: { target: HTMLDivElement }) {
    this.emit<HTMLDivElement>('table:input', event.target);
  }
}

export default Table;
