import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('logs.db');

export const initLogs = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS logs (id PRIMARY KEY INTEGER NOT NULL, logName TEXT NOT NULL);',
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
