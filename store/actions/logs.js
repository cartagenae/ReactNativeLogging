import {
  CREATE_LOG,
  UPDATE_LOG,
  DELETE_LOG,
  SET_LOGS,
  INSERT_LOG_ENTRY,
  UPDATE_LOG_ENTRY,
  DELETE_LOG_ENTRY,
  DELETE_ALL_ENTRIES,
  SET_ENTRIES,
  SHOW_ENTRIES, //  Delete when done
  DELETE_ALL_LOGS,
  SORT_LOGS_DATE_FIRST,
  SORT_LOGS_DATE_LAST,
  SORT_LOGS_ALPHABETICAL_ASCENDING,
  SORT_LOGS_ALPHABETICAL_DESCENDING,
} from '../types';

import {
  fetchLogs,
  insertLog,
  editLog,
  renewLogIndex,
  removeLog,
  clearAllLogs,
  removeAllLogs,
  removeAllEntries,
  fetchEntries,
  insertEntry,
  editEntry,
  renewEntryIndex,
  removeEntry,
} from '../../helpers/logsDb';

export const createLog = (id, name, description, logIndex, created) => {
  return async dispatch => {
    try {
      await insertLog(id, name, description, logIndex, created);
      dispatch({
        type: CREATE_LOG,
        log: {
          id: id,
          name: name,
          description: description,
          logIndex: logIndex,
          created: created,
        }
      })
    }
    catch(error) {
      console.log('Unable to insert your log');
      console.log(error);
    }
  }
}

export const updateLog = (id, name, description) => {
  return async dispatch => {
    try {
      await editLog(id, name, description);
      dispatch({
        type: UPDATE_LOG,
        log: {
          id: id,
          name: name,
          description: description,
        }
      })
    }
    catch(error) {
      console.log('Unable to update your log');
      console.log(error);
    }
  }
}

export const deleteLog = id => {
  return async dispatch => {
    try {
      await removeLog(id);

      //  This is to reassign all the logIndex values after
      //  a log has been deleted
      const dbResult = await fetchLogs();
      const logs = dbResult.rows._array;

      for(let index = 0; index < logs.length; index++) {
        renewLogIndex(logs[index].id, index);
      }
      //  -------------------------------------------------

      dispatch({
        type: DELETE_LOG,
        log: {
          id: id,
        }
      })
    }
    catch(error) {
      console.log('Unable to delete your log');
      console.log(error);
    }
  }
}

export const setLogs = () => {
  return async dispatch => {
    try {
      const dbResult = await fetchLogs();
      dispatch({ type: SET_LOGS, logs: dbResult.rows._array });
    }
    catch(error) {
      console.log('Unable to load logs');
      console.log(error);
    }
  }
}

export const insertLogEntry = (
  id,
  logId,
  date,
  startTime,
  endTime,
  entry,
  entryIndex,
  created,
) => {
  return async dispatch => {
    try {
      await insertEntry(
        id,
        logId,
        date,
        startTime,
        endTime,
        entry,
        entryIndex,
        created,
      );

      dispatch({
        type: INSERT_LOG_ENTRY,
        logEntry: {
          id: id,
          logId: logId,
          date: date,
          startTime: startTime,
          endTime: endTime,
          entry: entry,
          entryIndex: entryIndex,
          created: created,
        }
      })
    }
    catch(error) {
      console.log('Unable to insert your log entry');
      console.log(error);
    }
  }
}

export const updateLogEntry = (entryId, logId, date, startTime, endTime, entry) => {
  return async dispatch => {
    await editEntry(entryId, startTime, endTime, entry);
    dispatch({
      type: UPDATE_LOG_ENTRY,
      logEntry: {
        entryId: entryId,
        logId: logId,
        date: date,
        startTime: startTime,
        endTime: endTime,
        entry: entry,
      }
    })
  }
}

export const deleteLogEntry = (logId, entryID) => {
  return async dispatch => {
    try {
      await removeEntry(entryID);

      //  This is to reassign all the logIndex values after
      //  a log has been deleted
      const dbResult = await fetchEntries();
      const entries = dbResult.rows._array;

      for(let index = 0; index < entries.length; index++) {
        entries[index].entryIndex = index;
        renewEntryIndex(entries[index].id, index);
      }
      // //  -------------------------------------------------

      dispatch({
        type: DELETE_LOG_ENTRY,
        log: {
          logId: logId,
          entryID: entryID,
        }
      })
    }
    catch(error) {
      console.log('Unable to delete your log entry');
      console.log(error);
    }
  }
}

export const deleteAllEntries = logId => {
  return async dispatch => {
    try {
      await removeAllEntries(logId);
      dispatch({
        type: DELETE_ALL_ENTRIES,
        logEntry: {
          logId: logId
        }
      });
    }
    catch(error) {
      console.log('Unable to remove all your entries');
      console.log(error);
    }
  }
}

//  This action is to load all the persisted logs to the current
//  logs reducer as soon as it is invoked
export const setEntries = () => {
  return async dispatch => {
    try {
      const dbResult = await fetchEntries();
      dispatch({ type: SET_ENTRIES, entries: dbResult.rows._array });
    }
    catch(error) {
      console.log('Unable to load entries');
      console.log(error);
    }
  }
}

//  Delete this when done
export const showEntries = () => {
  return async dispatch => {
    try {
      const dbResult = await fetchEntries();
      dispatch({ type: SHOW_ENTRIES, entries: dbResult.rows._array });
    }
    catch(error) {
      console.log('Unable to show your entries');
      console.log(error);
    }
  }
}

export const deleteAllLogs = () => {
  return async dispatch => {
    try {
      await removeAllLogs();
      dispatch({ type: DELETE_ALL_LOGS });
    }
    catch(error) {
      console.log('Unable to remove all your logs');
      console.log(error);
    }
  }
}

export const sortByDateFirst = () => {
  return {
    type: SORT_LOGS_DATE_FIRST,
  }
}

export const sortByDateLast = () => {
  return {
    type: SORT_LOGS_DATE_LAST,
  }
}

export const sortByAlphabeticalAscending = () => {
  return {
    type: SORT_LOGS_ALPHABETICAL_ASCENDING,
  }
}

export const sortByAlphabeticalDescending = () => {
  return {
    type: SORT_LOGS_ALPHABETICAL_DESCENDING,
  }
}
