import DomListener from '@core/DomListener';

interface ExcelComponentInterface {
  init: () => void,
  remove: () => void,
  toHTML: () => string,
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

  public init(): void {
    this.initListeners();
  }

  public remove(): void {
    this.removeListeners();
  }

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
