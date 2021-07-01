import ExcelComponent from '@core/ExcelComponent';
import Emitter from '@core/Emitter';

class Toolbar extends ExcelComponent {
  static className = 'excel__toolbar';

  constructor($root: HTMLElement, emitter: Emitter) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      emitter,
    });
  }

  public toHTML(): string {
    return `
      <div class="button">
        <i class="material-icons">format_align_left</i>
      </div>
      <div class="button">
        <i class="material-icons">format_align_center</i>
      </div>
      <div class="button">
        <i class="material-icons">format_align_right</i>
      </div>
      <div class="button">
        <i class="material-icons">format_bold</i>
      </div>
      <div class="button">
        <i class="material-icons">format_italic</i>
      </div>
      <div class="button">
        <i class="material-icons">format_underlined</i>
      </div>
    `;
  }

  protected onClick(): void {
    console.log('click toolbar');
  }
}

export default Toolbar;
