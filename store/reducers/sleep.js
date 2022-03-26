import {
  ADD_SLEEP,
  UPDATE_SLEEP,
  DELETE_SLEEP,
} from '../types';

import { v4 as uuidv4 } from 'uuid';

const initialState = {
  sleep: [],
}

const sleepReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_SLEEP:
      const newEntry = {
        id: action.sleep.id,
        date: action.sleep.date,
        startTime: action.sleep.startTime,
        endTime: action.sleep.endTime,
        entry: action.sleep.entry,
      }

      return {
        sleep: [...state.sleep, newEntry]
      }
    case UPDATE_SLEEP:
      const currentEntryIndex = state.sleep.findIndex(entry => entry.id === action.sleep.id);
      const lastIndex = state.sleep.length - 1;

      const updatedEntry = {
        id: action.sleep.id,
        date: action.sleep.date,
        startTime: action.sleep.startTime,
        endTime: action.sleep.endTime,
        entry: action.sleep.entry.trim(),
      }

      if(lastIndex === 0) {
        return {
          sleep: [updatedEntry]
        }
      }
      else {
        return {
          sleep: [
            ...state.sleep.slice(0, currentEntryIndex),
            updatedEntry,
            ...state.sleep.slice(currentEntryIndex + 1)
          ]
        }
      }
    case DELETE_SLEEP:
      const currentIndex = state.sleep.findIndex(entry => entry.id === action.sleep.id);

      console.log(`currentIndex: ${currentIndex}`)

      return {
        sleep: [
          ...state.sleep.slice(0, currentIndex),
          ...state.sleep.slice(currentIndex + 1)
        ]
      }
    default:
      return state;
  }
}

export default sleepReducer;
