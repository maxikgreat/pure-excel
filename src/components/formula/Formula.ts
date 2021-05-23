import ExcelComponent from '@core/ExcelComponent';

class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root: HTMLElement) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click'],
    });
  }

  public toHTML(): string {
    return `
      <div class="info">fx</div>
      <div class="input" contenteditable spellcheck="false"></div>
    `;
  }

  public onInput(event: { target: HTMLDivElement }) {
    console.log(this);
    console.log('on input formula works!', event.target?.textContent?.trim());
  }
}

export default Formula;
