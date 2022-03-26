import {
  ADD_DIARY,
  UPDATE_DIARY,
  DELETE_DIARY,
} from '../types';

import { v4 as uuidv4 } from 'uuid';

const initialState = {
  diary: [],
}

const diaryReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_DIARY:

      console.log('\n----- diary reducer -----');
      console.log(`action.diary.id: ${action.diary.id}`);
      console.log(`action.diary.date: ${action.diary.date}`);
      console.log(`action.diary.startTime: ${action.diary.startTime}`);
      console.log(`action.diary.endTime: ${action.diary.endTime}`);
      console.log(`action.diary.entry: ${action.diary.entry}`);
      console.log('-------------------------\n');

      const newEntry = {
        id: action.diary.id,
        date: action.diary.date,
        startTime: action.diary.startTime,
        endTime: action.diary.endTime,
        entry: action.diary.entry,
      }

      return {
        diary: [...state.diary, newEntry]
      }
    case UPDATE_DIARY:
      const currentEntryIndex = state.diary.findIndex(entry => entry.id === action.diary.id);
      const lastIndex = state.diary.length - 1;

      const updatedEntry = {
        id: action.diary.id,
        date: action.diary.date,
        startTime: action.diary.startTime,
        endTime: action.diary.endTime,
        entry: action.diary.entry.trim(),
      }

      if(lastIndex === 0) {
        return {
          diary: [updatedEntry]
        }
      }
      else {
        return {
          diary: [
            ...state.diary.slice(0, currentEntryIndex),
            updatedEntry,
            ...state.diary.slice(currentEntryIndex + 1)
          ]
        }
      }
    case DELETE_DIARY:
      const currentIndex = state.diary.findIndex(entry => entry.id === action.diary.id);

      return {
        diary: [
          ...state.diary.slice(0, currentIndex),
          ...state.diary.slice(currentIndex + 1)
        ]
      }
    default:
      return state;
  }
}

export default diaryReducer;
