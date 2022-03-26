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
  DELETE_ALL_ROWS,
  DELETE_ALL_ROWS_BY_TABLE,
  SORT_TABLES_DATE_FIRST,
  SORT_TABLES_DATE_LAST,
  SORT_TABLES_ALPHABETICAL_ASCENDING,
  SORT_TABLES_ALPHABETICAL_DESCENDING,
} from '../types';

import {
  fetchTables,
  fetchColumns,
  insertTable,
  insertColumn,
  clearAllTables,
  removeTable,
  renewTableIndex,
  editTable,
  editColumn,
  fetchRows,
  insertNewRow,
  editRow,
  removeRow,
  insertNewRowColumn,
  clearAllRows,
  clearAllRowsByTable,
  renewRowIndex,
} from '../../helpers/tablesDb';

export const createTable = (
  id,
  name,
  description='',
  columns,
  tableIndex,
  created,
) => {
  return async dispatch => {
    try {
      insertTable(
        id,
        name,
        description,
        tableIndex,
        created,
      );

      for(let index = 0; index < columns.length; index++) {
        insertColumn(
          columns[index],
          id, //  <-- tableId
        );
      }

      dispatch({
        type: CREATE_TABLE,
        table: {
          id: id,
          name: name,
          description: description,
          columns: columns,
          tableIndex: tableIndex,
          created: created,
        }
      })
    }
    catch(error) {
      console.log('Unable to insert your table and your column');
      console.log(error);
    }
  }
}

export const updateTable = (id, name, description, columns) => {
  return async dispatch => {
    try {
      await editTable(id, name, description);
      for(let index = 0; index < columns.length; index++) {
        editColumn(columns[index]);
      }

      dispatch({
        type: UPDATE_TABLE,
        table: {
          id: id,
          name: name,
          description: description,
          columns: columns,
        }
      })
    }
    catch(error) {
      console.log('Unable to update your table and your columns');
      console.log(error);
    }
  }
}

export const deleteTable = (id) => {
  return async dispatch => {
    try {
      await removeTable(id);

      //  This is to reassign all the tableIndex values after
      //  a table has been deleted
      const dbResult = await fetchTables();
      const tables = dbResult.rows._array;

      for(let index = 0; index < tables.length; index++) {
        renewTableIndex(tables[index].id, index);
      }
      //  ---------------------------------------------------

      dispatch({
        type: DELETE_TABLE,
        table: {
          id: id,
        }
      })
    }
    catch(error) {
      console.log('Unable to delete your table');
      console.log(error);
    }
  }
}

export const setTables = () => {
  return async dispatch => {
    try {
      const dbResult = await fetchTables();
      dispatch({ type: SET_TABLES, tables: dbResult.rows._array });
    }
    catch(error) {
      console.log('Unable to load tables');
      console.log(error);
    }
  }
}

export const setColumns = () => {
  return async dispatch => {
    try {
      const dbResult = await fetchColumns();
      dispatch({ type: SET_COLUMNS, columns: dbResult.rows._array });
    }
    catch(error) {
      console.log('Unable to load columns');
      console.log(error);
    }
  }
}

export const insertRow = (rowId, tableId, rowIndex, created, columns, row) => {
  return async dispatch => {
    try {
      await insertNewRow(
        rowId,
        tableId,
        rowIndex,
        created,
      )

      const rowColumn = {
        first: row[0] || '',
        second: row[1] || '',
        third: row[2] || '',
        fourth: row[3] || '',
        fifth: row[4] || '',
        sixth: row[5] || '',
        seventh: row[6] || '',
        eighth: row[7] || '',
      }

      await insertNewRowColumn(
        rowId,
        rowColumn.first,
        rowColumn.second,
        rowColumn.third,
        rowColumn.fourth,
        rowColumn.fifth,
        rowColumn.sixth,
        rowColumn.seventh,
        rowColumn.eighth,
      )

      dispatch({
        type: INSERT_ROW,
        row: {
          id: rowId,
          tableId: tableId,
          rowIndex: rowIndex,
          created: created,
          columns: columns,
          row: row,
        }
      })
    }
    catch(error) {
      console.log('Unable to insert your row');
      console.log(error);
    }
  }
}

export const updateRow = (id, tableId, rowIndex, rowItems) => {
  return async dispatch => {
    try {
      await editRow(id, rowItems);

      dispatch({
        type: UPDATE_ROW,
        row: {
          id: id,
          tableId: tableId,
          rowIndex: rowIndex,
          rowItems: rowItems,
        }
      })
    }
    catch(error) {
      console.log('Unable to update your row');
      console.log(error);
    }
  }
}

export const deleteRow = (rowId, tableId) => {
  return async dispatch => {
    try {
      await removeRow(rowId);

      let currentRows = [];

      const dbResult = await fetchRows();

      dbResult.rows._array.map(row => {
        if(row.tableId === tableId) {
          currentRows.push(row)
        }
      });

      for(let index = 0; index < currentRows.length; index++) {
        renewRowIndex(currentRows[index].id, index);
      }

      dispatch({
        type: DELETE_ROW,
        row: {
          id: rowId,
          tableId: tableId,
        }
      })
    }
    catch(error) {
      console.log('Unable to delete your row');
      console.log(error);
    }
  }
}

//  This action is to load all the persisted rows to the current
//  tables reducer rows as soon as it is invoked
export const setRows = () => {
  return async dispatch => {
    try {
      const rowsResult = await fetchRows();
      const columnsResult = await fetchColumns();

      dispatch({
        type: SET_ROWS,
        rows: rowsResult.rows._array,
        columns: columnsResult.rows._array,
      });
    }
    catch(error) {
      console.log('Unable to load your rows');
      console.log(error);
    }
  }
}

//  Delete this action when you're done
export const showRows = () => {
  return async dispatch => {
    try {
      const dbResult = await fetchRows();
      console.log(`\nshow Rows dbResult: ${JSON.stringify(dbResult.rows._array)}\n`);
      dispatch({ type: SHOW_ROWS, rows: dbResult.rows._array });
    }
    catch(error) {
      console.log('Unable to show rows');
      console.log(error);
    }
  }
}

//  This was written to delete everything for if column limit
//  needs to be altered from 6 to 8 or any other number
export const deleteAllTables = () => {
  return async dispatch => {
    try {
      await clearAllTables();
      dispatch({ type: DELETE_ALL_TABLES });
    }
    catch(error) {
      console.log('Unable to delete all tables and columns');
      console.log(error);
    }
  }
}

export const deleteAllRowsByTable = tableId => {
  return async dispatch => {
    try {
      await clearAllRowsByTable(tableId);
      dispatch({
        type: DELETE_ALL_ROWS_BY_TABLE,
        table: {
          id: tableId,
        }
      })
    }
    catch(error) {
      console.log('Unable to delete all rows');
      console.log(error);
    }
  }
}

export const sortByDateFirst = () => {
  return {
    type: SORT_TABLES_DATE_FIRST,
  }
}

export const sortByDateLast = () => {
  return {
    type: SORT_TABLES_DATE_LAST,
  }
}

export const sortByAlphabeticalAscending = () => {
  return {
    type: SORT_TABLES_ALPHABETICAL_ASCENDING,
  }
}

export const sortByAlphabeticalDescending = () => {
  return {
    type: SORT_TABLES_ALPHABETICAL_DESCENDING,
  }
}
