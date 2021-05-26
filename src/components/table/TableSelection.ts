
class TableSelection {
  constructor(private group: HTMLElement[]) {}

  public select($element: HTMLElement) {
    this.group.push($element);
  }

  public selectGroup() {
    console.log('check');
  }
}

export default TableSelection;
