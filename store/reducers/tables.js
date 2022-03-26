import {
  CREATE_TABLE,
  UPDATE_TABLE,
  DELETE_TABLE,
  SET_TABLES,
  SET_COLUMNS,
  INSERT_ROW,
  UPDATE_ROW,
  DELETE_ROW,
  SET_ROWS,
  SHOW_ROWS,  // Delete this when done
  DELETE_ALL_TABLES,
  DELETE_ALL_ROWS_BY_TABLE,
  SORT_TABLES_DATE_FIRST,
  SORT_TABLES_DATE_LAST,
  SORT_TABLES_ALPHABETICAL_ASCENDING,
  SORT_TABLES_ALPHABETICAL_DESCENDING,
} from '../types';

import Table from '../../models/table';
import Row from '../../models/row';

import Column from '../../models/column';

const initialState = {
  tables: [],
}

const tablesReducer = (state = initialState, action) => {
  switch(action.type) {
    case CREATE_TABLE:
      // This trims the all the columnNames from whitespaces
      // before submitting them to the newTable object
      action.table.columns.map(column => (
        column.columnName = column.columnName.trim()
      ))
    
      const newTable = {
        id: action.table.id,
        name: action.table.name.trim(),
        description: action.table.description.trim(),
        columns: action.table.columns, // trimmed
        rows: [],
        tableIndex: action.table.tableIndex,
        created: action.table.created,
      }

      return {
        tables: [...state.tables, newTable]
      };
    case UPDATE_TABLE:
      const currentUpdateTable = state.tables.find(table => table.id === action.table.id);
      const currentUpdateTableIndex = state.tables.findIndex(table => table.id === action.table.id);
      const currentUpdateRows = currentUpdateTable.rows;
      let outdatedColumnNames = [];
      let updatedColumnNames = [];

      // This trims the all the columnNames from whitespaces
      // before submitting them to the newTable object

      // Also populates outdatedColumnNames and updatedColumnNames
      action.table.columns.map(column => {
        column.columnName = column.columnName.trim()

        outdatedColumnNames.push(currentUpdateTable.columns[column.columnIndex].columnName)
        updatedColumnNames.push(column.columnName)
      })
      

      //  TODO: This is a nested loop. It runs O(n^2).
      //        Optimize this to an O(n) algorithm.
      for(let i = 0; i < currentUpdateRows.length; i++) {
        for(let j = 0; j < outdatedColumnNames.length; j++) {
          if(updatedColumnNames[j] !== outdatedColumnNames[j]) {
            currentUpdateTable.rows[i][updatedColumnNames[j]] = currentUpdateTable.rows[i][outdatedColumnNames[j]];

            delete currentUpdateTable.rows[i][outdatedColumnNames[j]];
          }
        }
      }

      const updatedTable = {
        id: action.table.id,
        name: action.table.name.trim(),
        description: action.table.description.trim(),
        columns: action.table.columns, // trimmed
        rows: currentUpdateTable.rows,
        tableIndex: currentUpdateTable.tableIndex,
        created: currentUpdateTable.created,
      }
      
      return {
        tables: [
          ...state.tables.slice(0, currentUpdateTableIndex),
          updatedTable,
          ...state.tables.slice(currentUpdateTableIndex + 1)
        ]
      };
    case DELETE_TABLE:
      const deleteTableIndex = state.tables.findIndex(table => table.id === action.table.id);

      // Creates a snapshot of the state.tables to reassign all the tableIndex values
      let updatedDeletedTables = {
        tables: [
          ...state.tables.slice(0, deleteTableIndex),
          ...state.tables.slice(deleteTableIndex + 1)
        ]
      }

      // Reassign all the tableIndex values
      for(let index = 0; index < updatedDeletedTables.tables.length; index++) {
        updatedDeletedTables.tables[index].tableIndex = index;
      }

      return updatedDeletedTables;
    case SET_TABLES:
      const persistedTables = {
        tables: action.tables.map(
          table => new Table(
            table.id,
            table.name,
            table.description,
            table.tableIndex,
            new Date(table.created),
          )
        )
      }

      return persistedTables;
    case SET_COLUMNS:
      const persistedColumns = {
        columns: action.columns.map(
          column => new Column(
            column.id,
            column.columnName,
            column.columnIndex,
          )
        )
      }

      for(let index = 0; index < action.columns.length; index++) {
        const currentTable = state.tables.find(table => table.id === action.columns[index].tableId);
        currentTable.columns.push(persistedColumns.columns[index]);
      }

      return state;
    case INSERT_ROW:
      const currentColumns = action.row.columns;
      const currentRow = action.row.row;
      const tableId = action.row.tableId;
      const currentInsertRowTable = state.tables.find(table => table.id === tableId);
      const tableIndex = currentInsertRowTable.tableIndex;

      const newRow = {
        id: action.row.id,
        tableId: tableId,
        rowIndex: action.row.rowIndex,
        created: action.row.created,
      }

      for(let index = 0; index < currentColumns.length; index++) {
        newRow[currentColumns[index]] = currentRow[index].trim()
        //  newRow = {
        //    id: action.row.id,
        //    tableId: tableId,
        //    rowIndex: action.row.rowIndex,
        //    created: action.row.created,
        //    currentColumns[0]: currentRow[0], <- add example
        //    currentColumns[1]: currentRow[1], <- add example
        //  }

        //  DON'T DELETE THE ABOVE COMMENT!!!!!!!
      }

      currentInsertRowTable.rows.push(newRow)

      return {
        tables: [
          ...state.tables.slice(0, tableIndex),
          currentInsertRowTable,
          ...state.tables.slice(tableIndex + 1)
        ]
      };
    case UPDATE_ROW:
      const currentUpdateRowTable = state.tables.find(table => table.id === action.row.tableId);
      const currentUpdateRow = currentUpdateRowTable.rows.find(row => row.id === action.row.id);
      const rowItems = action.row.rowItems;
      const updateRowTableIndex = currentUpdateRowTable.tableIndex;

      rowItems.map(row => {
        currentUpdateRow[row.columnName] = row.columnValue.trim();
      })

      return {
        tables: [
          ...state.tables.slice(0, updateRowTableIndex),
          currentUpdateRowTable,
          ...state.tables.slice(updateRowTableIndex + 1)
        ]
      };
    case DELETE_ROW:
      const currentDeleteRowTable = state.tables.find(table => table.id === action.row.tableId);
      const currentDeleteRowIndex = currentDeleteRowTable.rows.findIndex(row => row.id === action.row.id);

      currentDeleteRowTable.rows = [
        ...currentDeleteRowTable.rows.slice(0, currentDeleteRowIndex),
        ...currentDeleteRowTable.rows.slice(currentDeleteRowIndex + 1)
      ]

      //  Reassigns the rowIndexes so that the DataTableScreen stays
      //  consistent with the row color scheme
      for(let i = 0; i < currentDeleteRowTable.rows.length; i++) {
        currentDeleteRowTable.rows[i].rowIndex = i;
      }

      return {
        tables: [
          ...state.tables.slice(0, currentDeleteRowTable.tableIndex),
          currentDeleteRowTable,
          ...state.tables.slice(currentDeleteRowTable.tableIndex + 1)
        ]
      };
    case SET_ROWS:
      const persistedSetRows = {
        rows: action.rows.map(
          row => new Row(
            row.id,
            row.tableId,
            row.rowIndex,
            row.created,
            row.first,
            row.second,
            row.third,
            row.fourth,
            row.fifth,
            row.sixth,
            row.seventh,
            row.eighth,
          )
        )
      }

      //  TODO: Figure out how to make this run faster. This is Big O - O(n^2)
      for(let rowIndex = 0; rowIndex < action.rows.length; rowIndex++) {
        const currentSetRowsTable = state.tables.find(table => table.id === action.rows[rowIndex].tableId);
        let newSetRow = {
          id: action.rows[rowIndex].id,
          tableId: action.rows[rowIndex].tableId,
          rowIndex: action.rows[rowIndex].rowIndex,
          created: action.rows[rowIndex].created,
        }

        const currentRowColumn = [];

        action.columns.map(column => {
          if(column.tableId === persistedSetRows.rows[rowIndex].tableId) {
            currentRowColumn.push(column);
          }
        })
        
        const currentRowColumns = [
          persistedSetRows.rows[rowIndex].first,
          persistedSetRows.rows[rowIndex].second,
          persistedSetRows.rows[rowIndex].third,
          persistedSetRows.rows[rowIndex].fourth,
          persistedSetRows.rows[rowIndex].fifth,
          persistedSetRows.rows[rowIndex].sixth,
          persistedSetRows.rows[rowIndex].seventh,
          persistedSetRows.rows[rowIndex].eighth,
        ]

        for(let columnIndex = 0; columnIndex < currentRowColumn.length; columnIndex++) {
          newSetRow[currentRowColumn[columnIndex].columnName] = currentRowColumns[columnIndex];
        }
        currentSetRowsTable.rows.push(newSetRow);
      }
      
      return state;
    case SHOW_ROWS:
      const rowsToDisplay = {
        rows: action.rows.map(
          row => new Row(
            row.id,
            row.tableId,
            row.rowIndex,
            row.created,
            row.first,
            row.second,
            row.third,
            row.fourth,
            row.fifth,
            row.sixth,
            row.seventh,
            row.eighth,
          )
        )
      }

      console.log(`\nyour rowsToDisplay: ${JSON.stringify(rowsToDisplay.rows)}\n`)

      return state;
    case DELETE_ALL_TABLES:
      return {
        tables: [],
      }
    case DELETE_ALL_ROWS_BY_TABLE:
      const currentDeleteAllRowsTable = state.tables.find(table => table.id === action.table.id);
      const currentDeleteAllRowsTableIndex = state.tables.findIndex(table => table.id === action.table.id);
      currentDeleteAllRowsTable.rows = [];

      return {
        tables: [
          ...state.tables.slice(0, currentDeleteAllRowsTableIndex),
          currentDeleteAllRowsTable,
          ...state.tables.slice(currentDeleteAllRowsTableIndex + 1)
        ]
      };
    case SORT_TABLES_DATE_FIRST:
      let sortedTablesByDateFirst = [
        ...state.tables.sort((a, b) => b.created - a.created),
      ];

      // Reassign all the tableIndex values
      for(let index = 0; index < sortedTablesByDateFirst.length; index++) {
        sortedTablesByDateFirst[index].tableIndex = index;
      };

      return {
        tables: sortedTablesByDateFirst,
      };
    case SORT_TABLES_DATE_LAST:
      let sortedTablesByDateLast = [
        ...state.tables.sort((a, b) => a.created - b.created),
      ];

      // Reassign all the tableIndex values
      for(let index = 0; index < sortedTablesByDateLast.length; index++) {
        sortedTablesByDateLast[index].tableIndex = index;
      };

      return {
        tables: sortedTablesByDateLast,
      };
    case SORT_TABLES_ALPHABETICAL_ASCENDING:
      let sortedTablesByAlphabetAscending = [
        ...state.tables.sort((a, b) => {
          if(a.name < b.name) {
            return -1;
          }
          if(a.name > b.name) {
            return 1;
          }
          return 0;
        })
      ];

      // Reassign all the tableIndex values
      for(let index = 0; index < sortedTablesByAlphabetAscending.length; index++) {
        sortedTablesByAlphabetAscending[index].tableIndex = index;
      };

      return {
        tables: sortedTablesByAlphabetAscending,
      };
    case SORT_TABLES_ALPHABETICAL_DESCENDING:
      let sortedTablesByAlphabetDescending = [
        ...state.tables.sort((a, b) => {
          if(a.name < b.name) {
            return 1;
          }
          if(a.name > b.name) {
            return -1;
          }
          return 0;
        })
      ];

      // Reassign all the tableIndex values
      for(let index = 0; index < sortedTablesByAlphabetDescending.length; index++) {
        sortedTablesByAlphabetDescending[index].tableIndex = index;
      };

      return {
        tables: sortedTablesByAlphabetDescending,
      };
    default:
      return state;
  }
}

export default tablesReducer;
