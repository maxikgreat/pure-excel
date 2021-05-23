import ExcelComponent from '@core/ExcelComponent';

class Header extends ExcelComponent {
  static className = 'excel__header';

  public toHTML(): string {
    return `
      <input type="text" class="input" value="New Table" />
      <div>
        <div class="button">
          <i class="material-icons">exit_to_app</i>
        </div>
        <div class="button">
          <i class="material-icons">delete</i>
        </div>
      </div>
    `;
  }
}

export default Header;
