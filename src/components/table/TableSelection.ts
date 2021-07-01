
class TableSelection {
  static className = 'selected';

  private group: HTMLDivElement[] = []
  public current: HTMLDivElement | null = null;

  constructor() {}

  private clear() {
    this.group.forEach(($cell) => $cell.classList.remove(TableSelection.className));
    this.group.length = 0;
  }

  public select($element: HTMLDivElement | null) {
    if (!$element) return;

    this.clear();

    this.current = $element;

    this.group.push($element);
    $element.focus();
    $element.classList.add(TableSelection.className);
  }

  public selectGroup($elements: HTMLDivElement[]) {
    this.clear();

    this.group = $elements;
    this.group.forEach(($cell) => $cell.classList.add(TableSelection.className));
  }
}

export default TableSelection;
