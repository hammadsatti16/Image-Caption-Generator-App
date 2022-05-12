export default class Column {
  name: string;
  label: string;
  field: string;
  sortable: boolean;
  style?: string;
  align = "left";
  override = false;
  defaultColumn = false;

  constructor(
    field: string,
    label: string,
    sortable = false,
    override = false,
    style = "",
    defaultColumn = false
  ) {
    this.name = field;
    this.label = label;
    this.field = field;
    this.sortable = sortable;
    this.style = style;
    this.override = override;
    this.defaultColumn = defaultColumn;
  }

  get templateName(): string {
    return `body-cell-${this.name}`;
  }
}
