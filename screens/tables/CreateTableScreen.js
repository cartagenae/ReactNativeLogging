import React, {
  useState,
  useCallback,
  useEffect
} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  useWindowDimensions,
  Pressable,
  Keyboard,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Animated,
  ScrollView,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { TextInput, Button } from 'react-native-paper';
import Colors from '../../constants/Colors';
import { AntDesign, Entypo } from '@expo/vector-icons';
import FloatingActionButton from '../../components/FloatingActionButton';

import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { HeaderHeightContext } from '@react-navigation/stack';

import * as tablesActions from '../../store/actions/tables.js';

let columnValueCounter;

const CreateTableScreen = ({ navigation }) => {
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  const [tableName, setTableName] = useState('');
  const [tableDescription, setTableDescription] = useState('');
  const [columns, setColumns] = useState(
    [
      {
        id: uuidv4(), // For the FlatList and ScrollView unique id
        columnName: '',
        columnIndex: 0,
      },
    ]
  );
  const tables = useSelector(state => state.tables.tables);
  const settings = useSelector(state => state.settings.settings);
  const tableIndex = tables.length;

  useEffect(() => {
    columnValueCounter = 1;
  }, [])

  const dispatch = useDispatch();

  //  These variables are for the swipeables to close when the user
  //  clicks anywhere on the screen

  let row = [];
  let previousOpenedRow;
  let itemIndex;

  //  -------------------------------------------------------------

  //  styles to keep dynamic to the windowHeight and windowWidth hooks
  //  and settings.isDarkMode

  const title = {
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: windowHeight / 10.80,
    marginBottom: windowHeight / 50.15,
  }
  
  const vertical = {
    marginTop: windowHeight / 50.75,
    marginBottom: windowHeight / 40.70,
    backgroundColor: settings.isDarkMode ?
        Colors.MatteBlack
      :
        Colors.DefaultGray,
  }

  //  -------------------------------------------------------------------

  let headerTitle = 'Create Table';
  let tableNamePlaceholder = 'Table Name';
  let optionalPlaceholder = 'Optional';
  let descriptionPlaceholder = 'Description';
  let columnNamePlaceholder = 'Column Name';
  let noTableTitle = 'No table name';
  let noTableMessage = 'Please enter a table name';
  let columnMinimumTitle = '1 Column Minimum';
  let columnMinimumMessage = 'You need to have at least 1 column';
  let emptyColumnTitle = 'Empty Column';
  let emptyColumnMessage = 'Please enter a column name';
  let deleteColumnTitle = 'Confirm delete column';
  let deleteColumnMessage = 'Would you like to delete this column?';
  let columnLimitTitle = 'Columns Limit Reached';
  let columnLimitText = 'No more than 8 columns';
  let anotherTableTitle = 'There is another table named';
  let anotherTableMessage = 'Would you like to continue?';
  let deleteText = 'Delete';
  let columnsText = 'Columns:';
  let yesText = 'Yes';
  let noText = 'No';
  let insertText = 'Insert';
  let removeText = 'Remove';

  switch(settings.language) {
    case 'Español':
      headerTitle = 'Crear Tabla';
      tableNamePlaceholder = 'Nombre de Tabla';
      optionalPlaceholder = 'Opcional';
      descriptionPlaceholder = 'Descripción';
      columnNamePlaceholder = 'Nombre de Columna';
      noTableTitle = 'Su tabla no tiene nombre';
      noTableMessage = 'Por favor nombre su tabla';
      columnMinimumTitle = '1 Columna por Minimo';
      columnMinimumMessage = 'Necesitas por lo menos una columna';
      emptyColumnTitle = 'Columna Vacia';
      emptyColumnMessage = 'Por favor nombre su columna';
      deleteColumnTitle = 'Confirmar eliminacion de columna';
      deleteColumnMessage = 'Desea borrar esta columna?';
      columnLimitTitle = 'Límite de Columnas Alcanzado';
      columnLimitText = 'No se permite más de 8 columnas';
      anotherTableTitle = 'Existe otra tablada nombrada';
      anotherTableMessage = 'Quisiera continuar?';
      deleteText = 'Borrar';
      columnsText = 'Columnas:';
      yesText = 'Sí';
      noText = 'No';
      insertText = 'Añadir';
      removeText = 'Retirar';

      break;
    default:
      headerTitle = 'Create Table';
      tableNamePlaceholder = 'Table Name';
      optionalPlaceholder = 'Optional';
      descriptionPlaceholder = 'Description';
      columnNamePlaceholder = 'Column Name';
      noTableTitle = 'No table name';
      noTableMessage = 'Please enter a table name';
      columnMinimumTitle = '1 Column Minimum';
      columnMinimumMessage = 'You need to have at least 1 column';
      emptyColumnTitle = 'Empty Column';
      emptyColumnMessage = 'Please enter a column name';
      deleteColumnTitle = 'Confirm delete column';
      deleteColumnMessage = 'Would you like to delete this column?';
      columnLimitTitle = 'Columns Limit Reached';
      columnLimitText = 'No more than 8 columns';
      anotherTableTitle = 'There is another table named';
      anotherTableMessage = 'Would you like to continue?';
      deleteText = 'Delete';
      columnsText = 'Columns:';
      yesText = 'Yes';
      noText = 'No';
      insertText = 'Insert';
      removeText = 'Remove';
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

  let modifyColumnsColors = settings.isDarkMode ?
    Colors.EasyPurple
  :
    Colors.LightPurple;

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
      
      modifyColumnsColors = settings.isDarkMode ?
        Colors.PurpleBlue
      :
        Colors.OrangeGold;

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

      modifyColumnsColors = settings.isDarkMode ?
        Colors.PurpleLove
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

      modifyColumnsColors = settings.isDarkMode ?
        Colors.OceanBlue
      :
        Colors.RiverGreen;

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

      modifyColumnsColors = settings.isDarkMode ?
        Colors.Marble
      :
        Colors.DarkGrayStone;

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

      modifyColumnsColors = settings.isDarkMode ?
        Colors.PurpleMoon
      :
        Colors.BloodRed;

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

      modifyColumnsColors = settings.isDarkMode ?
        Colors.StoneBlue
      :
        Colors.DeathGray;
      
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

      modifyColumnsColors = settings.isDarkMode ?
        Colors.EasyPurple
      :
        Colors.LightPurple;
  }

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

  const renderColumnInput = ({ item }) => {
    return (
      <Swipeable
        ref={ref => row[item.id] = ref}
        renderRightActions={(progress, dragX) => {
          const scale = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [1, 0],
            extrapolate: 'clamp',
          })
      
          return (
            <Pressable
              style={styles.rightAction}
              onPress={() => {
                if(columns.length === 1) {
                  Alert.alert(
                    columnMinimumTitle,
                    columnMinimumMessage,
                    [
                      {
                        text: 'OK',
                        onPress: () => closeCurrentRow(item.id),
                      },
                    ]
                  )
                  return;
                }

                Alert.alert(
                  deleteColumnTitle,
                  deleteColumnMessage,
                  [
                    {
                      text: yesText,
                      onPress: () => {
                        const currentIndex = columns.findIndex(column => column.id === item.id);
                        const sliced = [
                          ...columns.slice(0, currentIndex),
                          ...columns.slice(currentIndex + 1)
                        ]

                        // Reassigns all the columnIndex values to
                        // to the sliced array before overwriting
                        // columns state array with sliced array
                        for(let i = 0; i < sliced.length; i++) {
                          sliced[i].columnIndex = i;
                        };

                        setColumns(sliced);
                        columnValueCounter -= 1;
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
                    fontSize: settings.language === 'Español' ? 19 : 18,
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
        <TextInput
          value={item.value}
          onChangeText={text => {
            let columnIndex = item.columnIndex
            if(columnIndex === 0) {
              return setColumns(columns => [
                {
                  id: columns[columnIndex].id,
                  columnName: text,
                  columnIndex: columns[columnIndex].columnIndex
                },
                ...columns.slice(columnIndex + 1, columns.length)
              ])
            }
            else if(columnIndex > 0 && columnIndex < columns.length) {
              return setColumns(columns => [
                ...columns.slice(0, columnIndex),
                {
                  id: columns[columnIndex].id,
                  columnName: text,
                  columnIndex: columns[columnIndex].columnIndex
                },
                ...columns.slice(columnIndex + 1, columns.length)
              ])
            }
            else {
              return setColumns(columns => [
                ...columns.slice(0, columns.length - 1),
                {
                  id: columns[columns.length - 1].id,
                  columnName: text,
                  columnIndex: columns[columns.length - 1].columnIndex,
                }
              ])
            }
          }}
          style={vertical}
          label={columnNamePlaceholder}
          theme={textInputTheme}
          keyboardAppearance={settings.isDarkMode ? 'dark' : 'light'}
        />
      </Swipeable>
    )
  }

  const insertColumnHandler = () => {
    if(columns.length === 8) {
      Alert.alert(
        columnLimitTitle,
        columnLimitText,
        [
          {
            text: 'OK'
          },
        ]
      )
      return;
    }
    const newColumn = {
      id: uuidv4(), // For the FlatList unique id
      columnName: '',
      columnIndex: columnValueCounter,
    }
    setColumns(columns => [...columns, newColumn])
    columnValueCounter += 1;
  }

  const removeColumnHandler = useCallback(() => {
    const lastColumn = columns.length - 1;
    if(columns.length === 1) {
      Alert.alert(
        columnMinimumTitle,
        columnMinimumMessage,
        [
          {
            text: 'OK'
          },
        ]
      )
      return;
    }
    let sliced = [...columns.slice(0, lastColumn)]
    setColumns(sliced)
    columnValueCounter -= 1;
  })

  const submitButtonHandler = () => {
    if(tableName === '') {
      Alert.alert(
        noTableTitle,
        noTableMessage,
        [
          {
            text: 'OK'
          }
        ]
      )
      return;
    }
    setTableName(tableName.trim());
    setTableDescription(tableDescription.trim());

    for(let index = 0; index < columns.length; index++) {
      if (columns[index].columnName === '') {
        Alert.alert(
          `${emptyColumnTitle}: ${columns[index].columnName}`,
          emptyColumnMessage,
          {
            text: 'OK'
          }
        )
        return;
      }
    }

    if(tables.find(table => table.name === tableName.trim())) {
      Alert.alert(
        `${anotherTableTitle} ${tableName}`,
        anotherTableMessage,
        [
          {
            text: yesText,
            onPress: () => {
              const tableId = uuidv4();
              const newTableIndex = tables.length;
              const created = new Date();

              dispatch(tablesActions.createTable(
                tableId,
                tableName,
                tableDescription,
                columns,
                newTableIndex,
                created,
              ));

              if(settings.sortTablesMode === 'alphabetical_ascending') {
                dispatch(tablesActions.sortByAlphabeticalAscending());
              };

              if(settings.sortTablesMode === 'alphabetical_descending') {
                dispatch(tablesActions.sortByAlphabeticalDescending());
              };

              if(settings.sortTablesMode === 'first_created') {
                dispatch(tablesActions.sortByDateFirst());
              };
          
              navigation.navigate('DataTable', {
                tableId,
                tableName,
                columns,
                tableIndex,
              });
            }
          },
          {
            text: noText,
          }
        ]
      )
    }
    else {
      const tableId = uuidv4();
      const newTableIndex = tables.length;
      const created = new Date();
      
      dispatch(tablesActions.createTable(
        tableId,
        tableName,
        tableDescription,
        columns,
        newTableIndex,
        created,
      ));

      if(settings.sortTablesMode === 'alphabetical_ascending') {
        dispatch(tablesActions.sortByAlphabeticalAscending());
      };

      if(settings.sortTablesMode === 'alphabetical_descending') {
        dispatch(tablesActions.sortByAlphabeticalDescending());
      };

      if(settings.sortTablesMode === 'first_created') {
        dispatch(tablesActions.sortByDateFirst());
      };
      
      navigation.navigate('DataTable', {
        tableId,
        tableName,
        columns,
        tableIndex
      });
    }
  }

  const textInputTheme = {
    colors: {
      primary: placeholderFocused,
      text: settings.isDarkMode ? textColor : '#000',
      placeholder: settings.isDarkMode ? placeholderColor : 'gray',
    },
  }

  const buttonTheme = {
    colors: {
      primary: modifyColumnsColors,
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
            '#fff'
        }
      ]}
      onPress={() => {
        Keyboard.dismiss();
        itemIndex && closeCurrentRow(itemIndex);
      }}
    >
      <Pressable 
        style={
          Platform.OS === 'ios' ?
            styles.chevron
          :
            styles.close
        }
      >
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
          title,
          {
            color: settings.isDarkMode ?
              '#fff'
            :
              '#000',
          },
        ]}
      >
        {headerTitle}
      </Text>
      <View
        style={{
          width: windowWidth / 1.05
        }}
      >
        <View style={styles.formBodyContainer}>
          <TextInput
            value={tableName}
            onChangeText={setTableName}
            style={[
              vertical,
              {
                backgroundColor: settings.isDarkMode ?
                  Colors.MatteBlack
                :
                  Colors.DefaultGray,
              },
            ]}
            label={tableNamePlaceholder}
            theme={textInputTheme}
            keyboardAppearance={settings.isDarkMode ? 'dark' : 'light'}
          />
          <TextInput
            value={tableDescription}
            onChangeText={setTableDescription}
            placeholder={optionalPlaceholder}
            style={[
              vertical,
              {
                backgroundColor: settings.isDarkMode ?
                  Colors.MatteBlack
                :
                  Colors.DefaultGray,
              }
            ]}
            label={descriptionPlaceholder}
            theme={textInputTheme}
            keyboardAppearance={settings.isDarkMode ? 'dark' : 'light'}
          />
          <Text
            style={[
              styles.columnsText,
              {
                color: settings.isDarkMode ?
                  '#fff'
                :
                  '#000'
              }
            ]}
          >
            {columnsText}
          </Text>
        </View>
      </View>
      <HeaderHeightContext.Consumer>
        {headerHeight => (
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : headerHeight + 64}
            style={styles.keyboardContainer}
          >
            {
              Platform.OS === 'android' ?
                <ScrollView
                  style={{
                    width: windowWidth / 1.1,
                  }}
                >
                  {columns.map(column => (
                    <Swipeable
                      key={column.id}
                      ref={ref => row[column.id] = ref}
                      renderRightActions={(progress, dragX) => {
                        const scale = dragX.interpolate({
                          inputRange: [-100, 0],
                          outputRange: [1, 0],
                          extrapolate: 'clamp',
                        })
                    
                        return (
                          <Pressable
                            style={[
                              styles.rightAction,
                              {
                                backgroundColor: settings.isDarkMode ?
                                    Colors.PitchBlack
                                  :
                                    '#fff',
                              },
                            ]}
                            onPress={() => {
                              if(columns.length === 1) {
                                Alert.alert(
                                  columnMinimumTitle,
                                  columnMinimumMessage,
                                  [
                                    {
                                      text: 'OK',
                                      onPress: () => closeCurrentRow(column.id),
                                    },
                                  ]
                                )
                                return;
                              }
              
                              Alert.alert(
                                deleteColumnTitle,
                                deleteColumnMessage,
                                [
                                  {
                                    text: yesText,
                                    onPress: () => {
                                      const currentIndex = columns.findIndex(currentColumn => currentColumn.id === column.id);
                                      const sliced = [
                                        ...columns.slice(0, currentIndex),
                                        ...columns.slice(currentIndex + 1)
                                      ]
              
                                      setColumns(sliced);
                                      columnValueCounter -= 1;
                                      closePreviousRow(column.id);
                                    }
                                  },
                                  {
                                    text: noText,
                                    onPress: () => closeCurrentRow(column.id)
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
                                  fontSize: settings.language === 'Español' ? 19 : 18,
                                }
                              ]}
                            >
                              {deleteText}
                            </Animated.Text>
                          </Pressable>
                        )
                      }}
                      onSwipeableWillOpen={() => {
                        closePreviousRow(column.id);
                        itemIndex = column.id;
                      }}
                    >
                      <TextInput
                        value={column.columnName}
                        onChangeText={text => {
                          let columnIndex = column.columnIndex
                          if(columnIndex === 0) {
                            return setColumns(columns => [
                              {
                                id: columns[columnIndex].id,
                                columnName: text,
                                columnIndex: columns[columnIndex].columnIndex
                              },
                              ...columns.slice(columnIndex + 1, columns.length)
                            ])
                          }
                          else if(columnIndex > 0 && columnIndex < columns.length) {
                            return setColumns(columns => [
                              ...columns.slice(0, columnIndex),
                              {
                                id: columns[columnIndex].id,
                                columnName: text,
                                columnIndex: columns[columnIndex].columnIndex
                              },
                              ...columns.slice(columnIndex + 1, columns.length)
                            ])
                          }
                          else {
                            return setColumns(columns => [
                              ...columns.slice(0, columns.length - 1),
                              {
                                id: columns[columns.length - 1].id,
                                columnName: text,
                                columnIndex: columns[columns.length - 1].columnIndex,
                              }
                            ])
                          }
                        }}
                        style={vertical}
                        label={columnNamePlaceholder}
                        theme={textInputTheme}
                        keyboardAppearance={settings.isDarkMode ? 'dark' : 'light'}
                      />
                    </Swipeable>
                  ))}
                </ScrollView>
              :
                <FlatList
                  data={columns}
                  keyExtractor={(item) => item.id}
                  renderItem={renderColumnInput}
                  style={{
                    width: windowWidth / 1.1,
                  }}
                />
            }
          </KeyboardAvoidingView>
        )}
      </HeaderHeightContext.Consumer>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button
            onPress={insertColumnHandler}
            theme={buttonTheme}
          >
            <Text>{insertText}</Text>
          </Button>
        </View>
        <View style={styles.button}>
          <Button
            onPress={removeColumnHandler}
            theme={buttonTheme}
          >
            <Text>{removeText}</Text>
          </Button>
        </View>
      </View>
      <FloatingActionButton
        IconSource='FontAwesome5'
        iconName='feather-alt'
        iconSize={35}
        onPress={submitButtonHandler}
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
  close: {
    position: 'absolute',
    top: '5%',
    left: '4%',
  },
  formBodyContainer: {
    width: '95%',
    alignSelf: 'center'
  },
  columnsText: {
    fontSize: 22,
    fontWeight: '500',
    marginTop: '3%',
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
    flex: 1,
  },
  rightAction: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  actionText: {
    color: 'red',
    fontWeight: '700',
    paddingLeft: 25,
    paddingRight: 0,
  },
})

export default CreateTableScreen;
