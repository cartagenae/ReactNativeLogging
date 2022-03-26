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

import Log from '../../models/log';
import Entry from '../../models/entry';

const initialState = {
  logs: [],
}

const logsReducer = (state = initialState, action) => {
  switch(action.type) {
    case CREATE_LOG:
      const newLog = {
        id: action.log.id,
        name: action.log.name.trim(),
        description: action.log.description.trim(),
        entries: [],
        logIndex: action.log.logIndex,
        created: action.log.created,
      };

      return {
        logs: [
          ...state.logs,
          newLog
        ]
      };
    case UPDATE_LOG:
      const currentUpdateLog = state.logs.find(log => log.id === action.log.id);
      const updateLogIndex = state.logs.findIndex(log => log.id === action.log.id);
    
      const updatedLog = {
        id: action.log.id,
        name: action.log.name.trim(),
        description: action.log.description.trim(),
        entries: currentUpdateLog.entries,
        logIndex: currentUpdateLog.logIndex,
        created: currentUpdateLog.created,
      }

      return {
        logs: [
          ...state.logs.slice(0, updateLogIndex),
          updatedLog,
          ...state.logs.slice(updateLogIndex + 1)
        ]
      };
    case DELETE_LOG:
      const deleteLogIndex = state.logs.findIndex(log => log.id === action.log.id);

      // Creates a snapshot of the state.logs to reassign all the logIndex values
      let updatedDeletedLogs = {
        logs: [
          ...state.logs.slice(0, deleteLogIndex),
          ...state.logs.slice(deleteLogIndex + 1)
        ]
      };

      // Reassign all the logIndex values
      for(let index = 0; index < updatedDeletedLogs.logs.length; index++) {
        updatedDeletedLogs.logs[index].logIndex = index;
      };

      return updatedDeletedLogs;
    case SET_LOGS:
      const persistedLogs = {
        logs: action.logs.map(
          log => new Log(
            log.id,
            log.name,
            log.description,
            log.logIndex,
            new Date(log.created),
          )
        )
      }

      return persistedLogs;
    case INSERT_LOG_ENTRY:
      const currentLog = state.logs.find(log => log.id === action.logEntry.logId);
      const insertLogIndex = state.logs.findIndex(log => log.id === action.logEntry.logId);

      const newLogEntry = {
        id: action.logEntry.id,
        logId: action.logEntry.logId,
        date: action.logEntry.date,
        startTime: action.logEntry.startTime,
        endTime: action.logEntry.endTime,
        entry: action.logEntry.entry.trim(),
        entryIndex: action.logEntry.entryIndex,
        created: action.logEntry.created.toString(),
      };
      
      currentLog.entries = [
        ...currentLog.entries,
        newLogEntry
      ];

      return {
        logs: [
          ...state.logs.slice(0, insertLogIndex),
          currentLog,
          ...state.logs.slice(insertLogIndex + 1)
        ]
      };
    case UPDATE_LOG_ENTRY:
      const currentEntriesLogUpdate = state.logs.find(log => log.id === action.logEntry.logId);
      const entriesLogUpdateIndex = state.logs.findIndex(log => log.id === action.logEntry.logId);
      const currentUpdateLogEntry = currentEntriesLogUpdate.entries.find(entry => entry.id === action.logEntry.entryId);

      const updatedLogEntry = {
        id: action.logEntry.entryId,
        logId: action.logEntry.logId,
        date: action.logEntry.date,
        startTime: action.logEntry.startTime,
        endTime: action.logEntry.endTime,
        entry: action.logEntry.entry.trim(),
        entryIndex: currentUpdateLogEntry.entryIndex,
        created: currentUpdateLogEntry.created,
      };

      currentEntriesLogUpdate.entries = [
        ...currentEntriesLogUpdate.entries.slice(0, currentUpdateLogEntry.entryIndex),
        updatedLogEntry,
        ...currentEntriesLogUpdate.entries.slice(currentUpdateLogEntry.entryIndex + 1)
      ];

      return {
        logs: [
          ...state.logs.slice(0, entriesLogUpdateIndex),
          currentEntriesLogUpdate,
          ...state.logs.slice(entriesLogUpdateIndex + 1)
        ]
      };
    case DELETE_LOG_ENTRY:
      const currentDeleteLog = state.logs.find(log => log.id === action.log.logId);
      const currentDeleteLogIndex = currentDeleteLog.logIndex;

      const currentDeleteLogEntryIndex = currentDeleteLog.entries.findIndex(entry => entry.id === action.log.entryID);

      currentDeleteLog.entries = [
        ...currentDeleteLog.entries.slice(0, currentDeleteLogEntryIndex),
        ...currentDeleteLog.entries.slice(currentDeleteLogEntryIndex + 1)
      ];

      // Reassign all the entryIndex values
      for(let index = 0; index < currentDeleteLog.entries.length; index++) {
        currentDeleteLog.entries[index].entryIndex = index;
      };

      return {
        logs: [
          ...state.logs.slice(0, currentDeleteLogIndex),
          currentDeleteLog,
          ...state.logs.slice(currentDeleteLogIndex + 1)
        ]
      };
    case DELETE_ALL_ENTRIES:
      const currentDeleteEntriesLog = state.logs.find(log => log.id === action.logEntry.logId);
      const currentDeleteEntriesLogIndex = state.logs.findIndex(log => log.id === action.logEntry.logId);
      
      currentDeleteEntriesLog.entries = [];

      return {
        logs: [
          ...state.logs.slice(0, currentDeleteEntriesLogIndex),
          currentDeleteEntriesLog,
          ...state.logs.slice(currentDeleteEntriesLogIndex + 1)
        ]
      };
    case SET_ENTRIES:
      const persistedEntries = {
        entries: action.entries.map(
          entry => new Entry(
            entry.id,
            entry.logId,
            entry.date,
            entry.startTime,
            entry.endTime,
            entry.entry,
            entry.entryIndex,
            entry.created,
          )
        )
      }

      persistedEntries.entries.map(entry => {
        const currentEntryLog = state.logs.find(log => log.id === entry.logId);
        currentEntryLog.entries.push(entry);
      })

      return state;
    case SHOW_ENTRIES:
      const entriesToDisplay = {
        entries: action.entries.map(
          entry => new Entry(
            entry.id,
            entry.logId,
            entry.date,
            entry.startTime,
            entry.endTime,
            entry.entry,
            entry.entryIndex,
            entry.created,
          )
        )
      }

      console.log(`\nyour entries: ${JSON.stringify(entriesToDisplay.entries)}\n`);

      return state;
    case DELETE_ALL_LOGS:
      return {
        logs: [],
      }
    case SORT_LOGS_DATE_FIRST:
      let sortedLogsByDateFirst = [
        ...state.logs.sort((a, b) => b.created - a.created)
      ];

      // Reassign all the logIndex values
      for(let index = 0; index < sortedLogsByDateFirst.length; index++) {
        sortedLogsByDateFirst[index].logIndex = index;
      };

      return {
        logs: sortedLogsByDateFirst,
      };
    case SORT_LOGS_DATE_LAST:
      let sortedLogsByDateLast = [
        ...state.logs.sort((a, b) => a.created - b.created)
      ];

      // Reassign all the logIndex values
      for(let index = 0; index < sortedLogsByDateLast.length; index++) {
        sortedLogsByDateLast[index].logIndex = index;
      };

      return {
        logs: sortedLogsByDateLast,
      };
    case SORT_LOGS_ALPHABETICAL_ASCENDING:
      let sortedLogsByAlphabetAscending = [
        ...state.logs.sort((a, b) => {
          if(a.name < b.name) {
            return -1;
          }
          if(a.name > b.name) {
            return 1;
          }
          return 0;
        })
      ];

      // Reassign all the logIndex values
      for(let index = 0; index < sortedLogsByAlphabetAscending.length; index++) {
        sortedLogsByAlphabetAscending[index].logIndex = index;
      };

      return {
        logs: sortedLogsByAlphabetAscending,
      };
    case SORT_LOGS_ALPHABETICAL_DESCENDING:
      let sortedLogsByAlphabetDescending = [
        ...state.logs.sort((a, b) => {
          if(a.name < b.name) {
            return 1;
          }
          if(a.name > b.name) {
            return -1;
          }
          return 0;
        })
      ];

      // Reassign all the logIndex values
      for(let index = 0; index < sortedLogsByAlphabetDescending.length; index++) {
        sortedLogsByAlphabetDescending[index].logIndex = index;
      };
    
      return {
        logs: sortedLogsByAlphabetDescending,
      };
    default:
      return state;
  }
}

export default logsReducer;
