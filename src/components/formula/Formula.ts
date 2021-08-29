import ExcelComponent from '@core/ExcelComponent';
import Emitter from '@core/Emitter';

class Formula extends ExcelComponent {
  static className = 'excel__formula';
  private formulaElem: HTMLInputElement | null = null;

  constructor($root: HTMLElement, emitter: Emitter) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      emitter,
    });
  }

  init() {
    super.init();

    this.formulaElem = this.$root.querySelector('div.input');

    this.subscribe<HTMLDivElement | null>('table:select', ($cell) => {
      if (!$cell || !this.formulaElem) {
        return;
      }

      this.formulaElem.textContent = $cell.textContent ?? '';
    });

    this.subscribe<HTMLDivElement>('table:input', ($cell) => {
      if (!$cell || !this.formulaElem) {
        return;
      }

      this.formulaElem.textContent = $cell.textContent ?? '';
    });
  }

  public toHTML(): string {
    return `
      <div class="info">fx</div>
      <div class="input" contenteditable spellcheck="false"></div>
    `;
  }

  protected onInput(event: { target: HTMLDivElement }): void {
    const inputValue = event.target?.textContent?.trim();

    if (!inputValue) return;

    this.emit<string>('formula:input', inputValue);
  }

  protected onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === 'Tab') {
      event.preventDefault();

      this.emit<undefined>('formula:done');
    }
  }
}

export default Formula;
