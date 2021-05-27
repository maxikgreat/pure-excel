
class TableSelection {
  static className = 'selected';

  private group: HTMLDivElement[] = []
  constructor() {}

  private clear() {
    this.group.forEach(($cell) => $cell.classList.remove(TableSelection.className));
    this.group.length = 0;
  }

  public select($element: HTMLDivElement | null) {
    if (!$element) return;

    this.clear();

    this.group.push($element);
    $element.classList.add(TableSelection.className);
  }

  public selectGroup() {}
}

export default TableSelection;
