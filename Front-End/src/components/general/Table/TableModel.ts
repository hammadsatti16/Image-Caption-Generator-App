import Column from "./ColumnModel";

export default class Table {
  columns: Column[];

  constructor(columns: Column[]) {
    this.columns = columns;
  }
}
