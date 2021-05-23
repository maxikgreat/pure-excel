import DomListener from '@core/DomListener';

interface ExcelComponentInterface {
  toHTML: () => string,
}

class ExcelComponent extends DomListener implements ExcelComponentInterface {
  /**
   * Returns the HTML template of a component
   *
   * @return {string} HTML template
   */
  public toHTML(): string {
    return '';
  }
}

export default ExcelComponent;
