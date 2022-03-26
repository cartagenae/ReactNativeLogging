import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('tables.db');

export const initTablesDb = () => {
  const createTablesPromise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS tables (id TEXT NOT NULL PRIMARY KEY, name TEXT NOT NULL, description TEXT, tableIndex INT, created TEXT NOT NULL);',
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

  //  tables.id <---> one to many <---> columns.tableId
  const createColumnsPromise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS columns (id TEXT NOT NULL PRIMARY KEY, tableId TEXT NOT NULL, columnName TEXT NOT NULL, columnIndex INT, FOREIGN KEY(tableId) REFERENCES tables(id));',
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

  //  tables.id <---> one to many <---> rows.tableId
  const createRowsPromise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS rows (id TEXT NOT NULL PRIMARY KEY, tableId TEXT NOT NULL, rowIndex INT, created TEXT NOT NULL, first TEXT, second TEXT, third TEXT, fourth TEXT, fifth TEXT, sixth TEXT, seventh TEXT, eighth TEXT, FOREIGN KEY(tableId) REFERENCES tables(id));',
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

  return Promise.all([
    createTablesPromise,
    createColumnsPromise,
    createRowsPromise
  ])
}

export const dropAllTables = () => {
  const dropRowsPromise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DROP TABLE rows;',
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

  const dropColumnsPromise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DROP TABLE columns;',
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

  const dropTablesPromise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DROP TABLE tables;',
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

  return Promise.all([
    dropRowsPromise,
    dropColumnsPromise,
    dropTablesPromise,
  ])
}

export const fetchTables = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM tables;',
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

export const insertTable = (id, name, description, tableIndex, created) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO tables VALUES (?, ?, ?, ?, ?);',
        [id, name.trim(), description.trim(), tableIndex, created.toString()],
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

export const insertColumn = (column, tableId) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO columns VALUES (?, ?, ?, ?);',
        [column.id, tableId, column.columnName, column.columnIndex],
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

export const editTable = (tableId, name, description) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE tables SET name = ?, description = ? WHERE id = ?;',
        [name, description, tableId],
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

export const removeTable = tableId => {
  const removeTablePromise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM tables WHERE id = ?;',
        [tableId],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      )
    })
  })

  const removeColumnsPromise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM columns WHERE tableId = ?;',
        [tableId],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      )
    })
  })

  const removeRowsPromise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM rows WHERE tableId = ?;',
        [tableId],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      )
    })
  })

  return Promise.all([
    removeTablePromise,
    removeColumnsPromise,
    removeRowsPromise,
  ]);
}

export const fetchColumns = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM columns;',
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

export const editColumn = column => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE columns SET columnName = ? WHERE id = ?;',
        [column.columnName, column.id],
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

export const clearAllTables = () => {
  const deleteTablesPromise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM tables;',
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

  const deleteColumnsPromise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM columns;',
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

  const deleteRowsPromise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM rows;',
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

  return Promise.all([
    deleteTablesPromise,
    deleteColumnsPromise,
    deleteRowsPromise,
  ]);
}

export const renewTableIndex = (tableId, tableIndex) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE tables SET tableIndex = ? WHERE id = ?;',
        [tableIndex, tableId],
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

//  This function is just in case if you are undecided between
//  six columns or eight columns
export const dropRowsTable = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DROP TABLE rows;',
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

export const fetchRows = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM rows;',
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

export const insertNewRow = (rowId, tableId, rowIndex, created) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO rows (id, tableId, rowIndex, created) VALUES (?, ?, ?, ?);',
        [rowId, tableId, rowIndex, created.toString()],
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

export const editRow = (rowId, rowItems) => {
  const currentRow = [
    rowItems[0] ? rowItems[0].columnValue : '',
    rowItems[1] ? rowItems[1].columnValue : '',
    rowItems[2] ? rowItems[2].columnValue : '',
    rowItems[3] ? rowItems[3].columnValue : '',
    rowItems[4] ? rowItems[4].columnValue : '',
    rowItems[5] ? rowItems[5].columnValue : '',
    rowItems[6] ? rowItems[6].columnValue : '',
    rowItems[7] ? rowItems[7].columnValue : '',
  ];

  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE rows SET first = ?, second = ?, third = ?, fourth = ?, fifth = ?, sixth = ?, seventh = ?, eighth = ? WHERE id = ?;',
        [
          currentRow[0],
          currentRow[1],
          currentRow[2],
          currentRow[3],
          currentRow[4],
          currentRow[5],
          currentRow[6],
          currentRow[7],
          rowId,
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

export const removeRow = rowId => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM rows WHERE id = ?',
        [rowId],
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

export const insertNewRowColumn = (
  rowId,
  first,
  second,
  third,
  fourth,
  fifth,
  sixth,
  seventh,
  eighth,
) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE rows SET first = ?, second = ?, third = ?, fourth = ?, fifth = ?, sixth = ?, seventh = ?, eighth = ? WHERE id = ?;',
        [
          first.trim(),
          second.trim(),
          third.trim(),
          fourth.trim(),
          fifth.trim(),
          sixth.trim(),
          seventh.trim(),
          eighth.trim(),
          rowId
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

//  This function clears all rows regardless of table
export const clearAllRows = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM rows;',
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

//  This function clears all rows of the same tableId only
export const clearAllRowsByTable = tableId => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM rows WHERE tableId = ?;',
        [tableId],
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

export const renewRowIndex = (rowId, rowIndex) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE rows SET rowIndex = ? WHERE id = ?;',
        [rowIndex, rowId],
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
