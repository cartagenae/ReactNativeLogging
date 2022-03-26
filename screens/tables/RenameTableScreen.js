import React, { useState, useEffect } from 'react';
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
  ScrollView,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import Colors from '../../constants/Colors';
import { Entypo, AntDesign } from '@expo/vector-icons';
import FloatingActionButton from '../../components/FloatingActionButton';

import { useDispatch, useSelector } from 'react-redux';

import * as tablesActions from '../../store/actions/tables.js';

//  TODO: Fix the KeyboardAvoidingView within the form so that it can
//        six rows or more when the user focuses on it.

const RenameTableScreen = ({ navigation, route }) => {
  const {
    tableId
  } = route.params;
  const tables = useSelector(state => state.tables.tables);
  const settings = useSelector(state => state.settings.settings);
  const deleteTables = useSelector(state => state.deleteData.deleteTables);

  const currentTable = tables.length > 0 && tables.find(table => table.id === tableId);
  const currentColumns = tables.length > 0 && currentTable.columns;

  const [tableName, setTableName] = useState(currentTable.name);
  const [tableDescription, setTableDescription] = useState(currentTable.description);
  const [columns, setColumns] = useState(currentColumns);

  const windowHeight = useWindowDimensions().height;
  const windowWidth = useWindowDimensions().width;

  const dispatch = useDispatch();

  //  styles to keep dynamic to the windowHeight and windowWidth hooks

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

  //  ----------------------------------------------------------------

  let headerTitle = 'Edit Table Details'
  let tableNameText = 'Table Name';
  let optionalText = 'Optional';
  let tableDescriptionText = 'Description';
  let noTableNameText = 'No Table Name';
  let enterTableNameText = 'Please enter a table name';
  let anotherTableTitle = `There is another table named ${tableName}`;
  let continueText = 'Would you like to continue?';
  let emptyColumnTitle = 'Empty Column';
  let emptyColumnMessage = 'Please enter a column name';
  let columnsText = 'Columns:';
  let columnNamePlaceholder = 'Column Name';

  switch(settings.language) {
    case 'Español':
      headerTitle = 'Editar Tabla';
      tableNameText = 'Nombre de Tabla';
      optionalText = 'Opcional'
      tableDescriptionText = 'Descripción';
      noTableNameText = 'Tabla Sin Nombre';
      enterTableNameText = 'Por favor nombre su tabla';
      anotherTableTitle = `Hay otra tabla nombrada ${tableName}`;
      continueText = 'Quisiera continuar?';
      emptyColumnTitle = 'Columna vacia';
      emptyColumnMessage = 'Por favor nombre su columna';
      columnsText = 'Columnas:';
      columnNamePlaceholder = 'Nombre de Columna'
      
      break;
    default:
      headerTitle = 'Edit Table Details';
      tableNameText = 'Table Name';
      optionalText = 'Optional';
      tableDescriptionText = 'Description';
      noTableNameText = 'No Table Name';
      enterTableNameText = 'Please enter a table name';
      anotherTableTitle = `There is another table named ${tableName}`;
      continueText = 'Would you like to continue?';
      emptyColumnTitle = 'Empty Column';
      emptyColumnMessage = 'Please enter a column name';
      columnsText = 'Columns:';
      columnNamePlaceholder = 'Column Name';
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

  //  Forces to the navigation to go to the ViewLogsScreen so that the
  //  store can properly delete all logs without errors.
  useEffect(() => {
    if(deleteTables === true) {
      navigation.goBack();
    }
  }, [deleteTables])

  const renderColumnInput = ({ item }) => {
    return (
      <TextInput
        value={item.columnName}
        onChangeText={text => {
          let columnIndex = item.columnIndex
          return setColumns(columns => [
            ...columns.slice(0, columnIndex),
            {
              id: columns[columnIndex].id,
              columnName: text,
              columnIndex: columns[columnIndex].columnIndex
            },
            ...columns.slice(columnIndex + 1)
          ])
        }}
        label={columnNamePlaceholder}
        style={[
          vertical,
          {
            backgroundColor: settings.isDarkMode ?
              Colors.MatteBlack
            :
              Colors.DefaultGray,
          },
        ]}
        theme={textInputTheme}
        keyboardAppearance={settings.isDarkMode ? 'dark' : 'light'}
      />
    )
  }

  const submitButtonHandler = () => {
    const foundTable = tables.find(table => table.name === tableName.trim());

    if(tableName === '') {
      Alert.alert(
        noTableNameText,
        enterTableNameText,
        {
          text: 'Okay'
        }
      )
      return;
    }
    setTableName(tableName.trim());
    setTableDescription(tableDescription.trim());

    for(let index = 0; index < columns.length; index++) {
      if (columns[index].columnName === '') {
        Alert.alert(
          `${emptyColumnTitle}`,
          emptyColumnMessage,
          {
            text: 'Okay'
          }
        )
        return;
      }
    }

    // currentTable declared at the top of the RenameTableScreen function
    if(foundTable && foundTable.tableIndex !== currentTable.tableIndex) {
      Alert.alert(
        anotherTableTitle,
        continueText,
        [
          {
            text: 'Yes',
            onPress: () => {
              dispatch(tablesActions.updateTable(
                currentTable.id,
                tableName,
                tableDescription,
                columns
              ));

              // if(settings.sortTablesMode === 'alphabetical') {
              //   dispatch(tablesActions.sortByAlphabetical());
              // };
          
              navigation.goBack();
            }
          },
          {
            text: 'No',
          }
        ]
      )
    }
    else {
      dispatch(tablesActions.updateTable(
        currentTable.id,
        tableName,
        tableDescription,
        columns
      ));

      // if(settings.sortTablesMode === 'alphabetical') {
      //   dispatch(tablesActions.sortByAlphabetical());
      // };
  
      navigation.goBack();
    }
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
      <View style={{
        width: windowWidth / 1.05,
      }}>
        <View style={styles.formBodyContainer}>
          <TextInput
            value={tableName}
            onChangeText={setTableName}
            style={vertical}
            label={tableNameText}
            theme={textInputTheme}
            keyboardAppearance={settings.isDarkMode ? 'dark' : 'light'}
          />
          <TextInput
            value={tableDescription}
            onChangeText={setTableDescription}
            placeholder={optionalText}
            style={vertical}
            label={tableDescriptionText}
            theme={textInputTheme}
            keyboardAppearance={settings.isDarkMode ? 'dark' : 'light'}
          />
          <Text style={[
            styles.columnsText,
            {
              color: settings.isDarkMode ?
                '#fff'
              :
                '#000',
            },
          ]}>
            {columnsText}
          </Text>
        </View>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={styles.keyboardContainer}
      >
        {
          Platform.OS === 'android' ?
            <ScrollView
              style={{ width: windowWidth / 1.1 }}
            >
              {columns.map(column => (
                <TextInput
                  key={column.id}
                  value={column.columnName}
                  onChangeText={text => {
                    let columnIndex = column.columnIndex
                    return setColumns(columns => [
                      ...columns.slice(0, columnIndex),
                      {
                        id: columns[columnIndex].id,
                        columnName: text,
                        columnIndex: columns[columnIndex].columnIndex
                      },
                      ...columns.slice(columnIndex + 1)
                    ])
                  }}
                  style={vertical}
                  label={columnNamePlaceholder}
                  theme={textInputTheme}
                  keyboardAppearance={settings.isDarkMode ? 'dark' : 'light'}
                />
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  chevron: {
    position: 'absolute',
    top: '5%',
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
    marginTop: '3%'
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
    right: 30,
  },
  rightFloat: {
    position: 'absolute',
    bottom: 35,
    left: 30,
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

export default RenameTableScreen;
