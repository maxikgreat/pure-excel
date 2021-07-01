import ExcelComponent from '@core/ExcelComponent';
import Emitter from '@core/Emitter';

class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root: HTMLElement, emitter: Emitter) {
    super($root, {
      name: 'Formula',
      listeners: ['input'],
      emitter,
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
}

export default Formula;
