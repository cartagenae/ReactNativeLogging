class Table {
  constructor(
    id,
    name,
    description,
    tableIndex,
    created
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.columns = [];
    this.rows = [];
    this.tableIndex = tableIndex;
    this.created = created;
  }
}

export default Table;
