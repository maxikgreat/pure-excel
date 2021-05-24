import DomListener from '@core/DomListener';

interface ExcelComponentInterface {
  toHTML: () => string,
  init: () => void,
}

interface ComponentListenerOptions {
  name: string,
  listeners: string[]
}

class ExcelComponent extends DomListener implements ExcelComponentInterface {
  public name: string = '';

  constructor($root: HTMLElement, options?: ComponentListenerOptions) {
    super($root, options?.listeners ?? []);
    this.name = options?.name ?? '';
  }

  /**
   * Returns the HTML template of a component
   *
   * @return {string} HTML template
   */
  public toHTML(): string {
    return '';
  }

  public init(): void {
    this.initListeners();
  }

  public remove(): void {
    this.removeListeners();
  }
}

export default ExcelComponent;
