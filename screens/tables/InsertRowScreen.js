import React, { useState, useEffect } from 'react';
import {
  Text,
  StyleSheet,
  useWindowDimensions,
  Pressable,
  Keyboard,
  FlatList,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { TextInput } from 'react-native-paper';

import { Entypo, AntDesign } from '@expo/vector-icons';
import FloatingActionButton from '../../components/FloatingActionButton';
import Colors from '../../constants/Colors';
import { v4 as uuidv4 } from 'uuid';

import * as tablesActions from '../../store/actions/tables.js';

const InsertRowScreen = ({ navigation, route }) => {
  const [rows, setRows] = useState([]);
  const screenWidth = useWindowDimensions().width;

  const tables = useSelector(state => state.tables.tables);
  const settings = useSelector(state => state.settings.settings);
  const deleteTables = useSelector(state => state.deleteData.deleteTables);
  const {
    tableId
  } = route.params;

  const currentTable = tables.length > 0 && tables.find(table => table.id === tableId);
  const columns = currentTable.columns;

  const dispatch = useDispatch();

  //  styles to keep dynamic with the settings.isDarkMode hook

  const vertical = {
    marginTop: 25,
    marginBottom: 20,
    backgroundColor: settings.isDarkMode ?
      Colors.MatteBlack
    :
      Colors.DefaultGray,
  }

  //  --------------------------------------------------------

  let headerTitle = 'Insert Row';
  let rowEntryText = 'Empty row entry:';
  let rowEntriesText = 'Empty row entries:';
  let insertRowText = 'Do you still wish to insert row?';
  let yesText = 'Yes';
  let noText = 'No';

  switch(settings.language) {
    case 'Español':
      headerTitle = 'Añadir Fila';
      rowEntryText = 'Entrada de fila vacia:';
      rowEntriesText = 'Entradas de filas vacias:';
      insertRowText = 'Todavia desea añadir su fila?';
      yesText = 'Sí';
      noText = 'No';

      break;
    default:
      headerTitle = 'Insert Row';
      rowEntryText = 'Empty row entry:';
      rowEntriesText = 'Empty row entries:';
      insertRowText = 'Do you still wish to insert row?';
      yesText = 'Yes';
      noText = 'No';
  }

  let headerLeftColor = Colors.CalaGreen;
  let placeholderColor = Colors.EasyPurple;
  let placeholderFocused = Colors.CalaGreen;
  let textColor = Colors.CalaGreen;

  let fabColor = settings.isDarkMode ?
    Colors.FloatingPurple
  :
    Colors.RoyalPurple;

  let fabColorPressed = settings.isDarkMode ?
    Colors.CalaGreen
  :
    Colors.FloatingPurple;

  switch(settings.colorTheme) {
    case 'Zeus':
      headerLeftColor = Platform.OS === 'ios' ?
        settings.isDarkMode ?
          Colors.AlmightyGold
        :
          Colors.PurpleSky
      :
        Colors.AlmightyGold;

      placeholderColor = settings.isDarkMode ?
        Colors.DarkGold
      :
        Colors.OrangeGold;

      placeholderFocused = settings.isDarkMode ?
        Colors.DarkGold
      :
        Colors.Black;

      textColor = settings.isDarkMode ?
        Colors.PurpleBlue
      :
        Colors.OrangeGold;
      
      fabColor = settings.isDarkMode ?
        Colors.OrangeGold
      :
        Colors.PurpleSky;
      
      fabColorPressed  = settings.isDarkMode ?
        Colors.LightningOrange
      :
        Colors.PurpleCloud;

      break;
    case 'Hera':
      headerLeftColor = Platform.OS === 'ios' ?
        settings.isDarkMode ?
          Colors.PowerPurple
        :
          Colors.Pink
      :
        Colors.PinkPressed;

      placeholderColor = settings.isDarkMode ?
        Colors.PurpleLove
      :
        Colors.NeutralPink;

      placeholderFocused = settings.isDarkMode ?
        Colors.PurpleLove
      :
        Colors.FloatingPurple;
      
      textColor = settings.isDarkMode ?
        Colors.NeutralPink
      :
        Colors.FloatingPurple;

      fabColor = settings.isDarkMode ?
        Colors.EasyPurple
      :
        Colors.PurpleCharm;
      
      fabColorPressed = settings.isDarkMode ?
        Colors.PurpleThunder
      :
        Colors.PurpleThunder;

      break;
    case 'Poseidon':
      headerLeftColor = Platform.OS === 'ios' ?
        settings.isDarkMode ?
          Colors.PurpleBlue
        :
          Colors.RiverGreen
      :
        Colors.PurpleBlue;

      placeholderColor = settings.isDarkMode ?
        Colors.OceanTide
      :
        Colors.LightOcean;
      
      placeholderFocused = settings.isDarkMode ?
        Colors.CalaGreen
      :
        Colors.Black;

      textColor = settings.isDarkMode ?
        Colors.PurpleBlue
      :
        Colors.OceanTide;

      fabColor = settings.isDarkMode ?
        Colors.OceanTide
      :
        Colors.LightOcean;

      fabColorPressed = settings.isDarkMode ?
        Colors.CoolBlue
      :
        Colors.OceanTide;

      break;
    case 'Apollo':
      headerLeftColor = Platform.OS === 'ios' ?
        settings.isDarkMode ?
          Colors.Soldier
        :
          Colors.LimeGreen
      :
        Colors.Soldier;

      placeholderColor = settings.isDarkMode ?
        Colors.Marble
      :
        Colors.DarkGrayStone;

      placeholderFocused = settings.isDarkMode ?
        Colors.GrayStone
      :
        Colors.Soldier;
      
      textColor = settings.isDarkMode ?
        Colors.Soldier
      :
        Colors.DarkGrayStone;

      fabColor = settings.isDarkMode ?
        Colors.LimeGreen
      :
        Colors.DarkGrayStone;

      fabColorPressed = settings.isDarkMode ?
        Colors.Soldier
      :
        Colors.GrayStonePressed;

      break;
    case 'Artemis':
      headerLeftColor = Platform.OS === 'ios' ?
        settings.isDarkMode ?
          Colors.ArrowtipSilver
        :
          Colors.NightBlue
      :
        Colors.StoneBlue;

      placeholderColor = settings.isDarkMode ?
        Colors.PurpleMoon
      :
        Colors.NightBlue;

      placeholderFocused = settings.isDarkMode ?
        Colors.PurpleMoon
      :
        Colors.DeepPurple;

      textColor = settings.isDarkMode ?
        Colors.Moon
      :
        Colors.PurpleShadow;

      fabColor = settings.isDarkMode ?
        Colors.PurpleShadow
      :
        Colors.NightPurple;

      fabColorPressed = settings.isDarkMode ?
        Colors.DeepPurple
      :
        Colors.PurpleShadow;

      break;
    case 'Hades':
      headerLeftColor = Platform.OS === 'ios' ?
        settings.isDarkMode ?
          Colors.LightMaroon
        :
          Colors.DarkMaroon
      :
        Colors.BlueFire;

      placeholderColor = settings.isDarkMode ?
        Colors.Crimson
      :
        Colors.DarkMaroon;  
      
      placeholderFocused = settings.isDarkMode ?
        Colors.BlueFire
      :
        Colors.FireRed;

      fabColor = settings.isDarkMode ?
        Colors.StoneBlue
      :
        Colors.LightMaroon;

      fabColorPressed = settings.isDarkMode ?
        Colors.BlueFire
      :
        Colors.DarkMaroon;
      
      break;
    default:
      headerLeftColor = Colors.CalaGreen;
      placeholderColor = Colors.EasyPurple;
      placeholderFocused = Colors.CalaGreen;
      textColor = Colors.CalaGreen;

      fabColor = settings.isDarkMode ?
        Colors.FloatingPurple
      :
        Colors.RoyalPurple;
      
      fabColorPressed = settings.isDarkMode ?
        Colors.CalaGreen
      :
        Colors.FloatingPurple;
  }

  useEffect(() => {
    columns.map(column => (
      setRows(columns => [
        ...columns,
        {
          id: column.id,
          columnName: column.columnName,
          columnIndex: column.columnIndex,
          rowInput: ''
        }
      ])
    ));
  }, [])

  useEffect(() => {
    navigation.setOptions({
      headerTitle: headerTitle,
    })
  }, [])

  useEffect(() => {
    if(deleteTables === true) {
      navigation.goBack();
    }
  }, [deleteTables])

  const renderRowInput = ({ item }) => {
    return (
      <TextInput
        label={item.columnName}
        value={item.rowInput}
        onChangeText={text => {
          let columnIndex = item.columnIndex;
          if(item.columnIndex === 0) {
            return setRows(columns => [
              {
                id: item.id,
                columnName: item.columnName,
                columnIndex: item.columnIndex,
                rowInput: text
              },
              ...columns.slice(columnIndex + 1, columns.length)
            ])
          }
          else if(item.columnIndex > 0 && item.columnIndex < rows.length) {
            return setRows(columns => [
              ...columns.slice(0, columnIndex),
              {
                id: item.id,
                columnName: item.columnName,
                columnIndex: item.columnIndex,
                rowInput: text
              },
              ...columns.slice(columnIndex + 1, columns.length)
            ])
          }
          else {
            return setRows(columns => [
              ...columns.slice(0, columns.length -1),
              {
                id: item.id,
                columnName: item.columnName,
                columnIndex: item.columnIndex,
                rowInput: text
              }
            ])
          }
        }}
        style={[
          vertical,
          {
            backgroundColor: settings.isDarkMode ?
              Colors.MatteBlack
            :
              Colors.DefaultGray
          }
        ]}
        theme={textInputTheme}
        keyboardAppearance={settings.isDarkMode ? 'dark' : 'light'}
      />
    )
  }

  const textInputTheme = {
    colors: {
      primary: placeholderFocused,
      text: settings.isDarkMode ? textColor : '#000',
      placeholder: settings.isDarkMode ? placeholderColor : 'gray',
    },
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
      onPress={() => Keyboard.dismiss()}
    >
      <Pressable style={styles.chevron}>
        {
          Platform.OS === 'ios' ?
            <Entypo
              name='chevron-down'
              onPress={() => navigation.goBack()}
              size={32}
              color={headerLeftColor}
            />
          :
            <AntDesign
              name='close'
              onPress={() => navigation.goBack()}
              size={32}
              color={headerLeftColor}
            />
        }
      </Pressable>
      <Text
        style={[
          styles.title,
          {
            color: settings.isDarkMode ?
              '#fff'
            :
              '#000',
          }
        ]}
      >
        {headerTitle}
      </Text>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
        style={styles.keyboardContainer}
      >
        {
          Platform.OS === 'android' ?
            <ScrollView
              style={{
                width: screenWidth / 1.1,
              }}
            >
              {
                columns.map(column => (
                  <TextInput
                    key={column.id}
                    label={column.columnName}
                    value={column.rowInput}
                    onChangeText={text => {
                      let columnIndex = column.columnIndex;
                      if(column.columnIndex === 0) {
                        return setRows(columns => [
                          {
                            id: column.id,
                            columnName: column.columnName,
                            columnIndex: column.columnIndex,
                            rowInput: text
                          },
                          ...columns.slice(columnIndex + 1, columns.length)
                        ])
                      }
                      else if(column.columnIndex > 0 && column.columnIndex < rows.length) {
                        return setRows(columns => [
                          ...columns.slice(0, columnIndex),
                          {
                            id: column.id,
                            columnName: column.columnName,
                            columnIndex: column.columnIndex,
                            rowInput: text
                          },
                          ...columns.slice(columnIndex + 1, columns.length)
                        ])
                      }
                      else {
                        return setRows(columns => [
                          ...columns.slice(0, columns.length -1),
                          {
                            id: column.id,
                            columnName: column.columnName,
                            columnIndex: column.columnIndex,
                            rowInput: text
                          }
                        ])
                      }
                    }}
                    style={vertical}
                    theme={textInputTheme}
                    keyboardAppearance={settings.isDarkMode ? 'dark' : 'light'}
                  />
                ))
              }
            </ScrollView>
          :
            <FlatList
              data={columns}
              keyExtractor={(item) => item.id}
              renderItem={renderRowInput}
              style={{
                width: screenWidth / 1.1,
                position: 'relative',
              }}
            />
        }
      </KeyboardAvoidingView>
      <FloatingActionButton
        IconSource='FontAwesome5'
        iconName='feather-alt'
        iconSize={35}
        onPress={() => {
          let tableColumns = [];
          let tableRows = [];
          let emptyRows = [];
          columns.map(column => tableColumns.push(column.columnName));
          rows.map(row => tableRows.push(row.rowInput));
          rows.map(row => {
            if (row.rowInput === '') {
              emptyRows.push(row.columnName)
              return;
            }
          })
          if(emptyRows.length > 0) {
            console.log('you have empty rows')
            console.log(`emptyRows.length: ${emptyRows.length}`)

            Alert.alert(
              emptyRows.length === 1 ?
                `${rowEntryText} ${emptyRows}`
              : 
                `${rowEntriesText} ${emptyRows}`,
              insertRowText,
              [
                {
                  text: yesText,
                  onPress: () => {
                    const rowId = uuidv4();
                    const rowIndex = currentTable.rows.length;
                    const created = new Date();

                    dispatch(tablesActions.insertRow(
                      rowId,
                      currentTable.id,
                      rowIndex,
                      created,
                      tableColumns,
                      tableRows
                    )),
                    navigation.goBack()
                  }
                },
                {
                  text: noText,
                }
              ]
            )
            return;
          }
          const rowId = uuidv4();
          const rowIndex = currentTable.rows.length;
          const created = new Date();

          return (
            dispatch(tablesActions.insertRow(
              rowId,
              currentTable.id,
              rowIndex,
              created,
              tableColumns,
              tableRows)),
            navigation.goBack()
          )
        }}
        style={styles.floatingActionButton}
        shaded={true}
        buttonColor={fabColor}
        buttonColorPressed={fabColorPressed}
      />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  chevron: {
    position: 'absolute',
    top: '6%',
    left: '4%',
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 80,
    marginBottom: 15
  },
  formBodyContainer: {
    width: '95%',
    alignSelf: 'center'
  },
  columnsText: {
    fontSize: 22,
    fontWeight: '500',
    marginTop: 25
  },
  button: {
    alignSelf: 'center',
    marginBottom: 5,
    marginHorizontal: 10,
  },
  buttonContainer: {
    position: 'relative',
    bottom: 0,
    flexDirection: 'row',
    height: 50,
  },
  floatingActionButton: {
    position: 'absolute',
    bottom: 35,
    right: 30
  },
  buttonIndex: {
    position: 'absolute',
    bottom: 35,
    left: 30,
  },
  keyboardContainer: {
    flex: 1
  }
})

export default InsertRowScreen;
