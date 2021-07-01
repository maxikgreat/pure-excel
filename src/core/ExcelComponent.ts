import DomListener from '@core/DomListener';
import Emitter, {EmitterCallback} from '@core/Emitter';

interface ExcelComponentInterface {
  constructor: Function,
  init: () => void,
  remove: () => void,
  toHTML: () => string,
}

interface ExcelComponentOptions {
  name: string,
  listeners?: string[],
  emitter: Emitter,
}

class ExcelComponent extends DomListener implements ExcelComponentInterface {
  public name: string = '';
  private emitter: Emitter;
  private unsubscribers: VoidFunction[] = [];

  constructor($root: HTMLElement, options: ExcelComponentOptions ) {
    super($root, options.listeners ?? []);
    this.name = options.name ?? '';
    this.emitter = options.emitter;
  }

  protected emit<T>(event: string, data: T): void {
    this.emitter.emit<T>(event, data);
  }

  protected subscribe<T>(event: string, callback: EmitterCallback<T>): void {
    const unsubscribe = this.emitter.subscribe<T>(event, callback);
    this.unsubscribers.push(unsubscribe);
  }

  public init(): void {
    this.initListeners();
  }

  public remove(): void {
    this.removeListeners();
    this.unsubscribers.forEach((unsub) => unsub());
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
