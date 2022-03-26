import * as SQLite from 'expo-sqlite';
import { v4 as uuidv4 } from 'uuid';

//  TODO: Figure out how to insert the uuid as the id into your settingsDb

//  TODO: Create a row count query on the id field in your settingsDb

const db = SQLite.openDatabase('settings.db');

export const initSettings = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS settings (id TEXT PRIMARY KEY NOT NULL, isDarkMode TEXT NOT NULL, colorTheme TEXT NOT NULL, sortLogsMode TEXT NOT NULL, sortTablesMode TEXT NOT NULL, language TEXT NOT NULL);',
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      )
    })
  })
  return promise;
}

export const dropSettings = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DROP TABLE settings;',
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      )
    })
  })
  return promise;
}

export const deleteSettingsData = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM settings;',
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      )
    })
  })
  return promise;
}

export const fetchRowCount = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT COUNT(id) FROM settings;',
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      )
    })
  })
  return promise;
}

export const insertDefaultSettings = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO settings VALUES (?, "false", "Default", "last_created", "last_created", "English");',
        [uuidv4()],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      )
    })
  })
  return promise;
}

export const showSettings = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM settings;',
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      )
    })
  })
  return promise;
}

export const toggleDarkMode = isDarkMode => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE settings set isDarkMode = ?',
        [isDarkMode],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      )
    })
  })
  return promise;
}

export const fetchDarkMode = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT isDarkMode FROM settings',
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      )
    })
  })
  return promise;
}

export const updateColorTheme = colorTheme => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE settings set colorTheme = ?',
        [colorTheme],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      )
    })
  })
  return promise;
}

export const updateSortLogsMode = sortLogsMode => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE settings set sortLogsMode = ?',
        [sortLogsMode],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      )
    })
  })
  return promise;
}

export const updateSortTablesMode = sortTablesMode => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE settings set sortTablesMode = ?',
        [sortTablesMode],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      )
    })
  })
  return promise;
}

export const updateLanguage = language => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE settings set language = ?',
        [language],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      )
    })
  })
  return promise;
}
