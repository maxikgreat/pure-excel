import {Header, Formula, Table, Toolbar} from '@/components';
import $ from '@core/dom';

type Components = [typeof Header, typeof Toolbar, typeof Formula, typeof Table]
type Intances = (Header | Toolbar | Formula | Table)[] | [];

type ExcelOptions = {
  components: Components,
}

class Excel {
  private readonly $rootElement: HTMLElement;
  private components: Components;
  private instances: Intances = [];

  /**
   * @param {string} selector of root div in HTML
   * @param {ExcelOptions} extra options
   */
  constructor(private selector: string, private opts: ExcelOptions) {
    this.$rootElement = document.querySelector(selector) as HTMLElement;
    this.components = opts.components;
  }

  /**
   * @private getRoot for separate forming login of root container
   * with main components
   * @return {HTMLDivElement} formed root container
   */
  private getRoot(): HTMLDivElement {
    const $root = $.create('div', 'excel') as HTMLDivElement;

    this.instances = this.components.map((Component) => {
      const $container = $.create('div', Component.className);

      const component = new Component($container);
      $container.innerHTML = component.toHTML();

      $root.append($container);
      return component;
    });

    return $root;
  }

  public render(): void {
    this.$rootElement.append(this.getRoot());

    this.instances.forEach((instance) => instance.init());
  }
}

export default Excel;
