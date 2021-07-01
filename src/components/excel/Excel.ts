import {Header, Formula, Table, Toolbar} from '@/components';
import $ from '@core/dom';
import Emitter from '@core/Emitter';

type Components = [typeof Header, typeof Toolbar, typeof Formula, typeof Table]
type Instances = (Header | Toolbar | Formula | Table)[] | [];

type ExcelOptions = {
  components: Components,
}

class Excel {
  private readonly $rootElement: HTMLElement;
  private components: Components;
  private instances: Instances = [];
  private emitter = new Emitter();

  /**
   * @param {string} selector of root div in HTML
   * @param {ExcelOptions} opts options
   */
  constructor(private selector: string, private opts: ExcelOptions) {
    this.$rootElement = document.querySelector(selector) as HTMLElement;
    this.components = opts.components;
  }

  /**
   * @private getRoot for separate forming login of root container
   * with main components
   *
   * @return {HTMLDivElement} formed root container
   */
  private getRoot(): HTMLDivElement {
    const $root = $.create('div', 'excel') as HTMLDivElement;

    this.instances = this.components.map((Component) => {
      const $container = $.create('div', Component.className);

      const component = new Component($container, this.emitter);
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

  public destroy(): void {
    this.instances.forEach((instance) => instance.remove());
  }
}

export default Excel;
