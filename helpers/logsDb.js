import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('logs.db');

export const initLogsDb = () => {
  const createLogsPromise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS logs (id TEXT NOT NULL PRIMARY KEY, name TEXT NOT NULL, description TEXT, logIndex INT, created TEXT NOT NULL);',
        [],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      )
    })
  })

  //  logs.id <---> one to many <---> entries.logId
  const createEntriesPromise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS entries (id TEXT NOT NULL PRIMARY KEY, logId TEXT NOT NULL, date TEXT NOT NULL, startTime TEXT NOT NULL, endTime TEXT NOT NULL, entry TEXT NOT NULL, entryIndex INT, created TEXT NOT NULL, FOREIGN KEY(logId) REFERENCES logs(id));',
        [],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      )
    })
  })

  return Promise.all([createLogsPromise, createEntriesPromise]);
}

export const dropLogs = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DROP TABLE IF EXISTS logs;',
        [],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      )
    })
  })

  return promise;
}

export const dropEntries = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DROP TABLE IF EXISTS entries;',
        [],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        },
      )
    })
  })

  return promise;
}

export const fetchLogs = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM logs',
        [],
        (_, result) => {
          resolve(result)
        },
        (_, error) => {
          reject(error)
        }
      )
    })
  })

  return promise;
}

export const insertLog = (id, name, description, logIndex, created) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO logs VALUES (?, ?, ?, ?, ?);',
        [id, name.trim(), description.trim(), logIndex, created.toString()],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        },
      )
    })
  })

  return promise;
}

export const editLog = (logId, name, description) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE logs SET name = ?, description = ? WHERE id = ?;',
        [name.trim(), description.trim(), logId],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      )
    })
  })

  return promise;
}

export const renewLogIndex = (logId, newLogIndex) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE logs SET logIndex = ? WHERE id = ?;',
        [newLogIndex, logId],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      )
    })
  })

  return promise;
}

export const removeLog = logId => {
  const deleteEntriesPromise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM entries WHERE logId = ?;',
        [logId],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      )
    })
  })

  const deleteLogPromise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM logs WHERE id = ?;',
        [logId],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      )
    })
  })

  return Promise.all([deleteEntriesPromise, deleteLogPromise]);
}

//  This function is to remove all logs for reorder them based
//  on first/last created or ascending/descending order
export const clearAllLogs = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM LOGS;',
        [],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      )
    })
  })

  return promise;
}

//  This function is to remove all logs and related entries for good
export const removeAllLogs = () => {
  const deleteAllEntriesPromise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM entries;',
        [],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      )
    })
  })

  const deleteAllLogsPromise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM logs;',
        [],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        },
      )
    })
  })

  return Promise.all([deleteAllEntriesPromise, deleteAllLogsPromise]);
}

export const fetchEntries = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM entries',
        [],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        },
      )
    })
  })

  return promise;
}

export const insertEntry = (
  entryId,
  logId,
  date,
  startTime,
  endTime,
  entry,
  entryIndex,
  created
) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO entries VALUES (?, ?, ?, ?, ?, ?, ?, ?);',
        [
          entryId,
          logId,
          date,
          startTime,
          endTime,
          entry,
          entryIndex,
          created.toString(),
        ],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      )
    })
  })

  return promise;
}

export const editEntry = (entryId, startTime, endTime, entry) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE entries SET startTime = ?, endTime = ?, entry = ? WHERE id = ?;',
        [startTime, endTime, entry.trim(), entryId],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      )
    })
  })

  return promise;
}

export const renewEntryIndex = (entryId, newEntryIndex) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE entries SET entryIndex = ? WHERE id = ?;',
        [newEntryIndex, entryId],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      )
    })
  })

  return promise;
}

export const removeEntry = entryId => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM entries WHERE id = ?;',
        [entryId],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      )
    })
  })

  return promise;
}

export const removeAllEntries = logId => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM entries WHERE logId = ?',
        [logId],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      )
    })
  })

  return promise;
}
