import {
  ADD_SPIKE,
  UPDATE_SPIKE,
  DELETE_SPIKE,
} from '../types';

import { v4 as uuidv4 } from 'uuid';

const initialState = {
  spikes: [],
}

const spikesReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_SPIKE:
      const newEntry = {
        id: action.spike.id,
        date: action.spike.date,
        startTime: action.spike.startTime,
        endTime: action.spike.endTime,
        entry: action.spike.entry,
      }

      return {
        spikes: [...state.spikes, newEntry]
      }
    case UPDATE_SPIKE:
      const currentEntryIndex = state.spikes.findIndex(entry => entry.id === action.spike.id);
      const lastIndex = state.spikes.length - 1;

      const updatedEntry = {
        id: action.spike.id,
        date: action.spike.date,
        startTime: action.spike.startTime,
        endTime: action.spike.endTime,
        entry: action.spike.entry.trim(),
      }

      if(lastIndex === 0) {
        return {
          spikes: [updatedEntry]
        }
      }
      else {
        return {
          spikes: [
            ...state.spikes.slice(0, currentEntryIndex),
            updatedEntry,
            ...state.spikes.slice(currentEntryIndex + 1)
          ]
        }
      }
    case DELETE_SPIKE:
      const currentIndex = state.spikes.findIndex(entry => entry.id === action.spike.id);

      console.log(`currentIndex: ${currentIndex}`)

      return {
        spikes: [
          ...state.spikes.slice(0, currentIndex),
          ...state.spikes.slice(currentIndex + 1)
        ]
      }
    default:
      return state;
  }
}

export default spikesReducer;
