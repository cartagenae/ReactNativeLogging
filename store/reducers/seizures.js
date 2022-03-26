import {
  ADD_SEIZURE,
  UPDATE_SEIZURE,
  DELETE_SEIZURE,
} from '../types';

import { v4 as uuidv4 } from 'uuid';

const initialState = {
  seizures: [],
}

const seizuresReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_SEIZURE:
      const newEntry = {
        id: action.seizure.id,
        date: action.seizure.date,
        startTime: action.seizure.startTime,
        endTime: action.seizure.endTime,
        entry: action.seizure.entry,
      }

      return {
        seizures: [...state.seizures, newEntry]
      }
    case UPDATE_SEIZURE:
      const currentEntryIndex = state.seizures.findIndex(entry => entry.id === action.seizure.id);
      const lastIndex = state.seizures.length - 1;

      const updatedEntry = {
        id: action.seizure.id,
        date: action.seizure.date,
        startTime: action.seizure.startTime,
        endTime: action.seizure.endTime,
        entry: action.seizure.entry.trim(),
      }

      if(lastIndex === 0) {
        return {
          seizures: [updatedEntry]
        }
      }
      else {
        return {
          seizures: [
            ...state.seizures.slice(0, currentEntryIndex),
            updatedEntry,
            ...state.seizures.slice(currentEntryIndex + 1)
          ]
        }
      }
    case DELETE_SEIZURE:
      const currentIndex = state.seizures.findIndex(entry => entry.id === action.seizure.id);

      console.log(`currentIndex: ${currentIndex}`)

      return {
        seizures: [
          ...state.seizures.slice(0, currentIndex),
          ...state.seizures.slice(currentIndex + 1)
        ]
      }
    default:
      return state;
  }
}

export default seizuresReducer;
