import React, { useEffect } from 'react';
import {
  Text,
  StyleSheet,
  FlatList,
  Platform,
  useWindowDimensions,
  Pressable,
  Animated,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import { DataTable } from 'react-native-paper';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Colors from '../../constants/Colors.js';

import IconHeader from '../../components/IconHeader';

import { v4 as uuidv4 } from 'uuid';

import * as tablesActions from '../../store/actions/tables.js';

import XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

//  TODO: Figure out how to make the columns dynamically scrollable and
//        resizable for UX and UI optimization

//  TODO: Figure out how to edit each entry of the table. Maybe a
//        long press event through the pressable component

//  TODO: Check out the React Data Grid component from the
//        Material-UI library for more spreadsheet-like features

const DataTableScreen = ({ navigation, route }) => {
  const tables = useSelector(state => state.tables.tables)
  const settings = useSelector(state => state.settings.settings);
  const deleteTables = useSelector(state => state.deleteData.deleteTables);
  const { height } = useWindowDimensions();
  const dispatch = useDispatch();

  const {
    tableId,
    tableName,
    columns,
  } = route.params;

  //  tables.length > 0 && ... is to prevent the app from blowing up
  //  if there arent't any tables yet
  const currentTable = tables.length > 0 && (
    tables.find(table => table.id === tableId)
  );

  let columnNames = []
  columns.map(column => {
    columnNames.push(column.columnName)
  })

  //  These variables are for the swipeables to close when the user
  //  clicks anywhere on the screen

  let row = [];
  let previousOpenedRow;
  let itemIndex;

  //  -------------------------------------------------------------

  let deleteText = 'Delete';
  let deleteRowTitle = 'Are you sure?';
  let deleteRowMessage = 'Delete this row?';
  let yesText = 'Yes';
  let noText = 'No';

  switch(settings.language) {
    case 'Español':
      deleteText = 'Borrar';
      deleteRowTitle = 'Estas seguro(a)?';
      deleteRowMessage = 'Borrar esta fila?';
      yesText = 'Sí';
      noText = 'No';

      break;
    default:
      deleteText = 'Delete';
      deleteRowTitle = 'Are you sure?';
      deleteRowMessage = 'Delete this row?';
      yesText = 'Yes';
      noText = 'No';
  }

  let headerButtonColor = Colors.CalaGreen;
  let androidHeaderColor = Colors.PurpleFog;

  switch(settings.colorTheme) {
    case 'Zeus':
      headerButtonColor = Platform.OS === 'ios' ?
        settings.isDarkMode ?
          Colors.AlmightyGold
        :
          Colors.PurpleSky
      :
        Colors.AlmightyGold;

      androidHeaderColor = Colors.PurpleSky;

      break;
    case 'Hera':
      headerButtonColor = Platform.OS === 'ios' ?
        settings.isDarkMode ?
          Colors.PowerPurple
        :
          Colors.Pink
      :
        Colors.PinkPressed;

      androidHeaderColor = Colors.PurpleThunder;
      
      break;
    case 'Poseidon':
      headerButtonColor = Platform.OS === 'ios' ?
        settings.isDarkMode ?
          Colors.PurpleBlue
        :
          Colors.RiverGreen
      :
        Colors.PurpleBlue;

      androidHeaderColor = Colors.LightOcean;

      break;
    case 'Apollo':
      headerButtonColor = Platform.OS === 'ios' ?
        settings.isDarkMode ?
          Colors.Soldier
        :
          Colors.LimeGreen
      :
        Colors.Soldier;

      androidHeaderColor = Colors.DarkGrayStone;
      
      break;
    case 'Artemis':
      headerButtonColor = Platform.OS === 'ios' ?
        settings.isDarkMode ?
          Colors.ArrowtipSilver
        :
          Colors.NightBlue
      :
        Colors.StoneBlue;

      androidHeaderColor = Colors.DeepPurple;

      break;
    case 'Hades':
      headerButtonColor = Platform.OS === 'ios' ?
        settings.isDarkMode ?
          Colors.LightMaroon
        :
          Colors.DarkMaroon
      :
        Colors.BlueFire;

      androidHeaderColor = Colors.MatteBlack;
      
      break;
    default:
      headerButtonColor = Colors.CalaGreen;
      androidHeaderColor = Colors.PurpleFog;
  }

  //  Forces to the navigation to go to the ViewTablesScreen so that the
  //  store can properly delete all tables without errors.
  useEffect(() => {
    if(deleteTables === true) {
      navigation.popToTop();
    }
  }, [deleteTables]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: route.params ? tableName : 'View Tables',
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={IconHeader}>
          <Item
            title='GoBack'
            component='MaterialIcons'
            iconName='arrow-back'
            onPress={() => navigation.goBack()}
            size={32}
            color={headerButtonColor}
          />
        </HeaderButtons>
      ),
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={IconHeader}>
          <Item
            title='export-table'
            component='AntDesign'
            iconName='export'
            onPress={() => {
              const currentTableColumns = [];
              const tableOutput = [];

              currentTable.columns.map(column => {
                currentTableColumns.push(column.columnName);
              })

              currentTable.rows.map(row => {
                const rowOutput = {}
                for(let index = 0; index < currentTableColumns.length; index++) {
                  rowOutput[currentTableColumns[index]] = row[currentTableColumns[index]];
                }
                tableOutput.push(rowOutput);
              })

              handleTableExport(tableOutput);
            }}
            size={28}
            color={headerButtonColor}
          />
          <Item
            title='insert-row'
            component='MaterialIcons'
            iconName='playlist-add'
            onPress={() => {
              itemIndex && closeCurrentRow(itemIndex);
              navigation.navigate('InsertRow', {
                tableId: currentTable.id
              });
            }}
            size={32}
            color={headerButtonColor}
          />
        </HeaderButtons>
      ),
      headerTintColor: (
        Platform.OS === 'ios' ?
          settings.isDarkMode ? '#fff' : '#000'
        :
          '#fff'
      ),
      headerStyle: {
        backgroundColor: (
          Platform.OS === 'ios' ?
            settings.isDarkMode ? Colors.MatteBlack : '#fff'
          :
            androidHeaderColor
        ),
      },
    })
  })

  //  These functions are to close the swipeables whenever the user
  //  swipes another item or presses on anywhere else on the screen

  const closePreviousRow = (index) => {
    if(previousOpenedRow && previousOpenedRow !== row[index]) {
      previousOpenedRow.close();
    }
    previousOpenedRow = row[index];
  }

  const closeCurrentRow = (index) => {
    const currentRow = row[index];
    currentRow.close();
  }

  //  -------------------------------------------------------------

  const handleTableExport = async tableOutput => {
    const ws = XLSX.utils.json_to_sheet(tableOutput);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, currentTable.name);
    const wbout = XLSX.write(wb, {
      type: 'base64',
      bookType: "xlsx",
    })

    let logFileName = currentTable.name + '.xlsx';
    const dialogTitle = currentTable.name + ' data';

    logFileName = logFileName.split(' ').join('_');

    const uri = FileSystem.cacheDirectory + logFileName

    try {
      await FileSystem.writeAsStringAsync(uri, wbout, {
        encoding: FileSystem.EncodingType.Base64,
      });
      console.log('\n\nDone writing to the file system\n\n');
    }
    catch(error) {
      console.log('\nUnable to write to the file system\n');
      console.log(error);
    }

    try {
      await Sharing.shareAsync(uri, {
        mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        dialogTitle: dialogTitle,
        UTI: 'com.microsoft.excel.xlsx',
      })
      console.log('\nDone sharing the file\n');
    }
    catch(error) {
      console.log('\n\nUnable to share the file\n\n');
      console.log(error);
    }
  }

  const datatableTitleTheme = {
    colors: {
      text: settings.isDarkMode ?
        '#fff'
      :
        '#000'
    }
  }

  return (
    <Pressable
      style={[
        styles.container,
        {
          backgroundColor: settings.isDarkMode ?
            Colors.PitchBlack
          :
            '#fff',
        },
      ]}
      onPress={() => {
        itemIndex && (
          closeCurrentRow(itemIndex),
          itemIndex = null
        );
      }}
    >
      <DataTable>
        <DataTable.Header
          style={{
            backgroundColor: settings.isDarkMode ?
              Colors.PitchBlack
            :
              Colors.GrayLine
          }}
        >
          {
            columns.map(column => {
              return (
                <DataTable.Title
                  key={column.id}
                  theme={datatableTitleTheme}
                >
                  {column.columnName}
                </DataTable.Title>
              )
            })
          }
        </DataTable.Header>
        <FlatList
          data={currentTable.rows}
          keyExtractor={item => item.id}
          style={[
            {
              height: height / 1.31,
            },
          ]}
          renderItem={({ item }) => {
            return (
              <Swipeable
                ref={ref => row[item.id] = ref}
                renderRightActions={(progress, dragX) => {
                  const scale = dragX.interpolate({
                    inputRange: [-100, 0],
                    outputRange: [1, 0],
                    extrapolate: 'clamp'
                  })

                  return (
                    <Pressable
                      style={styles.rightAction}
                      onPress={() => {
                        Alert.alert(
                          deleteRowTitle,
                          deleteRowMessage,
                          [
                            {
                              text: yesText,
                              onPress: () => {
                                dispatch(tablesActions.deleteRow(
                                  item.id,
                                  item.tableId
                                ))
                              }
                            },
                            {
                              text: noText,
                              onPress: () => closeCurrentRow(item.id)
                            }
                          ]
                        )
                      }}
                    >
                      <Animated.Text
                        style={[
                          styles.actionText,
                          {
                            transform: [{ scale }],
                            fontSize: settings.language === 'Español' ? 17 : 18,
                          }
                        ]}
                      >
                        {deleteText}
                      </Animated.Text>
                    </Pressable>
                  )
                }}
                onSwipeableWillOpen={() => {
                  closePreviousRow(item.id);
                  itemIndex = item.id;
                }}
              >
                <Pressable
                  onPress={() => {
                    if(itemIndex) {
                      closeCurrentRow(itemIndex);
                      return itemIndex = null;
                    }
                    return (
                      navigation.navigate('RowDetailsScreen', {
                        tableId,
                        rowIndex: item.rowIndex,
                      })
                    )
                  }}
                >
                  <DataTable.Row
                    style={{
                      backgroundColor: settings.isDarkMode ?
                        item.rowIndex % 2 === 0 ?
                          Colors.SoftBlack
                        :
                          Colors.PitchBlack
                      :
                        item.rowIndex % 2 === 0 ?
                          Colors.White
                        :
                          Colors.WhiteSmoke,
                    }}
                  >
                    {
                      columnNames.map(columnName => {
                        return (
                          <DataTable.Cell key={uuidv4()}>
                            <Text
                              style={{
                                color: settings.isDarkMode ?
                                  '#fff'
                                :
                                  '#000',
                              }}
                            >
                              {item[columnName]}
                            </Text>
                          </DataTable.Cell>
                        )
                      })
                    }
                  </DataTable.Row>
                </Pressable>
              </Swipeable>
            )
          }}
        />
      </DataTable>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  actionText: {
    color: 'white',
    fontWeight: '600',
    padding: 15,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  floatingActionButton: {
    position: 'absolute',
    bottom: 35,
    right: 30
  },
  rightAction: {
    backgroundColor: 'red',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
})

export default DataTableScreen;
