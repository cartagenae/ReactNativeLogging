import React, { useState, useEffect } from 'react';
import {
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
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Colors from '../../constants/Colors';
import FloatingActionButton from '../../components/FloatingActionButton';
import IconHeader from '../../components/IconHeader';

import { useDispatch, useSelector } from 'react-redux';

import * as tablesActions from '../../store/actions/tables.js';

//  TODO: Change the title of this screen from RowDetailsScreen
//        to EditRowDetailsScreen

const RowDetailsScreen = ({ navigation, route }) => {
  const {
    tableId,
    rowIndex
  } = route.params;
  const tables = useSelector(state => state.tables.tables);
  const settings = useSelector(state => state.settings.settings);

  const currentTable = tables.length > 0 && tables.find(table => table.id === tableId);
  const currentRow = tables.length > 0 && currentTable.rows.find(row => row.rowIndex === rowIndex);
  
  const screenWidth = useWindowDimensions().width;
  const dispatch = useDispatch();

  let currentRowArray = [];

  //  tables.length > 0 && ... prevents the app from blowing up
  //  whenever the user presses anywhere on the screen and there
  //  are no tables yet
  tables.length > 0 && currentTable.columns.map(column => {
    const currentRowObject = Object.create({});
    currentRowObject['id'] = column.id;
    currentRowObject['columnName'] = column.columnName;
    currentRowObject['columnValue'] = currentRow[column.columnName];
    currentRowObject['columnIndex'] = column.columnIndex;
    currentRowArray.push(currentRowObject);
  })

  const [currentRowState, setCurrentRowState] = useState(currentRowArray);

  let headerTitle = 'Edit Row Details';
  let confirmEditTitle = 'Confirming your edit';
  let confirmEditMessage = 'Are you sure you want to submit your edit?';
  let yesText = 'Yes';
  let noText = 'No';

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

  switch(settings.language) {
    case 'Español':
      headerTitle = 'Editar Detalles de Fila';
      confirmEditTitle = 'Confirmar su edición';
      confirmEditMessage = 'Esta seguro(a) que quiere enviar su edición?';
      yesText = 'Sí';
      noText = 'No';

      break;
    default:
      headerTitle = 'Edit Row Details';
      confirmEditTitle = 'Confirming your edit';
      confirmEditMessage = 'Are you sure you want to submit your edit?';
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

  let androidHeaderColor = Colors.PurpleFog;

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

      androidHeaderColor = Colors.PurpleSky;

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

      androidHeaderColor = Colors.PurpleThunder;

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

      androidHeaderColor = Colors.LightOcean;

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

      androidHeaderColor = Colors.DarkGrayStone;

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

      androidHeaderColor = Colors.DeepPurple;

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

      androidHeaderColor = Colors.MatteBlack;
      
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

      androidHeaderColor = Colors.PurpleFog;
  }

  useEffect(() => {
    navigation.setOptions({
      headerTitle: headerTitle,
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={IconHeader}>
          <Item
            title='GoBack'
            component='MaterialIcons'
            iconName='arrow-back'
            onPress={() => navigation.goBack()}
            size={32}
            color={headerLeftColor}
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
    });
  })

  const renderRowItem = ({ item }) => {
    return (
      <TextInput
        value={item.columnValue}
        onChangeText={text => {
          const currentIndex = item.columnIndex;
          setCurrentRowState(columns => [
            ...columns.slice(0, currentIndex),
            {
              id: item.id,
              columnName: item.columnName,
              columnValue: text,
              columnIndex: item.columnIndex
            },
            ...columns.slice(currentIndex + 1)
          ])
        }}
        style={[
          vertical,
          {
            width: screenWidth / 1.1,
            backgroundColor: settings.isDarkMode ?
                Colors.MatteBlack
              :
                Colors.DefaultGray,
          }
        ]}
        label={item.columnName}
        theme={textInputTheme}
        keyboardAppearance={settings.isDarkMode ? 'dark' : 'light'}
      />
    )
  }

  const submitEditHandler = () => {

    //  THIS IS WHERE YOU'RE TRYING DISPLAY THE MESSAGE ONLY
    //  WHEN THE COLUMN VALUES HAVE BEEN MODIFIED

    const isModified = false;

    currentRowArray.map(row => {
      if(row.columnValue !== currentRowArray[row.columnIndex].columnValue) {
        isModified = true;
      }
    })

    //  ----------------------------------------------------

    Alert.alert(
      confirmEditTitle,
      confirmEditMessage,
      [
        {
          text: yesText,
          onPress: () => {
            dispatch(tablesActions.updateRow(
              currentRow.id,
              tableId,
              currentRow.rowIndex,
              currentRowState,
            ))
            navigation.goBack();
          }
        },
        {
          text: noText
        }
      ]
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
      onPress={() => Keyboard.dismiss()}
      style={[
        styles.container,
        {
          backgroundColor: settings.isDarkMode ?
              Colors.PitchBlack
            :
              '#fff',
        },
      ]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={90}
        style={styles.keyboardContainer}
      >
        <View style={styles.formBodyContainer}>
        {
          Platform.OS === 'android' ?
            <ScrollView
              style={{
                width: screenWidth / 1.1,
              }}
            >
              {
                currentRowState.map(row => (
                  <TextInput
                    key={row.id}
                    label={row.columnName}
                    value={row.columnValue}
                    onChangeText={text => {
                      const currentIndex = row.columnIndex;
                      setCurrentRowState(columns => [
                        ...columns.slice(0, currentIndex),
                        {
                          id: row.id,
                          columnName: row.columnName,
                          columnValue: text,
                          columnIndex: row.columnIndex
                        },
                        ...columns.slice(currentIndex + 1)
                      ])
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
              data={currentRowState}
              keyExtractor={item => item.id}
              renderItem={renderRowItem}
            />
        }
        </View>
      </KeyboardAvoidingView>
      <FloatingActionButton
        IconSource='FontAwesome5'
        iconName='feather-alt'
        iconSize={35}
        onPress={submitEditHandler}
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
    top: 50,
    left: 15
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
    right: 30,
  },
  leftFloat: {
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

export default RowDetailsScreen;
