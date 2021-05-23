import {capitalize} from '@core/utils';


const getMethodName = (eventName: string) => `on${capitalize(eventName)}`;

class DomListener {
  /**
   * @param {HTMLElement} $root as a container element of each component.
   * E.g. <div class="excel__header">...</div> for Header component.
   * @param {string[]} event listeners for it
   */
  constructor(private $root: HTMLElement, private listeners: string[]) {}

  /**
   * @protected method to add listeners to their containers.
   * Also keyword 'this' in this case (how funny, not) related to component class.
   * E.g. Formula, Header, Toolbar or Table. So we're adding listener for event 'input'
   * and pass as callback method onInput defined in one of the classes above.
   */
  protected initListeners(): void {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);
      // @ts-expect-error
      if (!this[method]) {
        // @ts-expect-error
        throw new Error(`Implement method '${method}' in '${this.name}' component`);
      }
      // @ts-expect-error
      this.$root.addEventListener(listener, (this[method] as Function).bind(this));
    });
  }

  /**
   *
   */
  protected removeListeners() {

  }
}

export default DomListener;
