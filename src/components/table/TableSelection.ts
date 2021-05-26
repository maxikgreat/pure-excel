
class TableSelection {
  constructor(private group: HTMLElement[]) {}

  public select($element: HTMLElement) {
    this.group.push($element);
  }

  public selectGroup() {

  }
}

export default TableSelection;
