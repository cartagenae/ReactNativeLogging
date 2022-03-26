import React from 'react';

import {
  combineReducers,
  createStore,
  applyMiddleware,
} from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import {
  initLogsDb,
  dropLogs,
  dropEntries,
} from './helpers/logsDb';

import {
  dropAllTables,
} from './helpers/tablesDb';

import { initTablesDb } from './helpers/tablesDb';

import MainBottomTabNavigator from './navigation/MainNavigator';

import diaryReducer from './store/reducers/diary';
import spikesReducer from './store/reducers/spikes';
import seizuresReducer from './store/reducers/seizures';
import sleepReducer from './store/reducers/sleep';
import logsReducer from './store/reducers/logs';
import tablesReducer from './store/reducers/tables';
import settingsReducer from './store/reducers/settings';
import deleteDataReducer from './store/reducers/deleteData';
import { LogBox } from 'react-native';

// dropLogs()
//   .then(result => {
//     console.log(result);
//     console.log(`\nLogs table dropped\n`);
//   })
//   .catch(error => {
//     console.log('\nUnable to drop your logs table\n');
//     console.log(error);
//   })

// dropEntries()
//   .then(result => {
//     console.log(result);
//     console.log(`\nEntries table dropped\n`);
//   })
//   .catch(error => {
//     console.log('\nUnable to drop your entries table\n');
//     console.log(error);
//   })

// dropAllTables()
//   .then(result => {
//     console.log('\nTables successfully dropped');
//     console.log(result);
//   })
//   .catch(error => {
//     console.log('\nUnable to drop your tables\n');
//     console.log(error);
//   })

initLogsDb()
  .then(result => {
    console.log(result);
    console.log('\nLogs database initialized\n');
  })
  .catch(error => {
    console.log('Logs databased failed to initialize');
    console.log(error);
  })

initTablesDb()
  .then(result => {
    console.log(result);
    console.log('Tables database initialized\n');
  })
  .catch(error => {
    console.log('Tables database failed to initialize');
    console.log(error);
  })

const rootReducer = combineReducers({
  diary: diaryReducer,
  spikes: spikesReducer,
  seizures: seizuresReducer,
  sleep: sleepReducer,
  logs: logsReducer,
  tables: tablesReducer,
  settings: settingsReducer,
  deleteData: deleteDataReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const App = () => {
  //  This is to avoid displaying warning messages on the Android version
  LogBox.ignoreLogs(
    ['Warning: Cannot record touch end without a touch start.']
  );
  //  -------------------------------------------------------------------
  return (
    <Provider store={store}>
      <MainBottomTabNavigator />
    </Provider>
  )
}

export default App;
