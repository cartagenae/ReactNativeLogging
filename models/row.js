class Row {
  constructor(
    id,
    tableId,
    rowIndex,
    created,
    first,
    second,
    third,
    fourth,
    fifth,
    sixth,
    seventh,
    eighth,
  ) {
    this.id = id;
    this.tableId = tableId;
    this.rowIndex = rowIndex;
    this.created = created;
    this.first = first || null;
    this.second = second || null;
    this.third = third || null;
    this.fourth = fourth || null;
    this.fifth = fifth || null;
    this.sixth = sixth || null;
    this.seventh = seventh || null;
    this.eighth = eighth || null;
  }
}

export default Row;
