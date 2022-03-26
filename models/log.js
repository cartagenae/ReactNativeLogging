class Log {
  constructor(
    id,
    name,
    description,
    logIndex,
    created,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.entries = [];
    this.logIndex = logIndex;
    this.created = created;
  }
}

export default Log;
