class Entry {
  constructor(
    id,
    logId,
    date,
    startTime,
    endTime,
    entry,
    entryIndex,
    created
  ) {
    this.id = id;
    this.logId = logId;
    this.date = date;
    this.startTime = startTime;
    this.endTime = endTime;
    this.entry = entry;
    this.entryIndex = entryIndex;
    this.created = created;
  }
}

export default Entry;
