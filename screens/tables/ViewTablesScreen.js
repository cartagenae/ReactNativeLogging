import React, { useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  FlatList,
  useWindowDimensions,
  Pressable,
  Animated,
  Alert,
  Platform,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import EntypoHeader from '../../components/EntypoHeader';
import IconHeader from '../../components/IconHeader';
import * as tablesActions from '../../store/actions/tables';
import * as deleteDataActions from '../../store/actions/deleteData';
import Colors from '../../constants/Colors.js';

import {
  Card,
  Title,
  Paragraph
} from 'react-native-paper';

import TextButton from '../../components/TextButton';

const ViewTablesScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const tables = useSelector(state => state.tables.tables);
  const settings = useSelector(state => state.settings.settings);
  const deleteTables = useSelector(state => state.deleteData.deleteTables);
  const screenWidth = useWindowDimensions().width;
  const screenHeight = useWindowDimensions().height;

  //  These variables are for the swipeables to close when the user
  //  clicks anywhere on the screen

  let row = [];
  let previousOpenedRow;
  let itemIndex;

  //  -------------------------------------------------------------

  let headerTitle = 'Tables';
  let noTablesText = 'No tables to display';
  let createTableText = 'Create Table';
  let editText = 'Edit';
  let deleteText = 'Delete';
  let deleteTableTitle = 'Delete Table';
  let deleteTableMessage = 'Are you sure you want to delete this table?';
  let yesText = 'Yes';
  let noText = 'No';

  switch(settings.language) {
    case 'Español':
      headerTitle = 'Tablas';
      noTablesText = 'No hay tablas para disponer';
      createTableText = 'Crear Tabla';
      editText = 'Editar';
      deleteText = 'Borrar'
      deleteTableTitle = 'Borrar Tabla';
      deleteTableMessage = 'Borrar esta tabla seguramente?';
      yesText = 'Sí';
      noText = 'No';

      break;
    default:
      headerTitle = 'Tables';
      noTablesText = 'No tables to display';
      createTableText = 'Create Table';
      editText = 'Edit';
      deleteText = 'Delete';
      deleteTableTitle = 'Delete Table';
      deleteTableMessage = 'Are you sure you want to delete this table?';
      yesText = 'Yes';
      noText = 'No';
  }

  let headerRightColor = Colors.CalaGreen;
  let cardBackgroundColor = Colors.PurpleFog;
  let cardTextColor = Colors.White;
  let androidHeaderColor = Colors.PurpleFog;

  switch(settings.colorTheme) {
    case 'Zeus':
      headerRightColor = Platform.OS === 'ios' ?
        settings.isDarkMode ?
          Colors.AlmightyGold
        :
          Colors.PurpleSky
      :
        Colors.AlmightyGold;

      cardBackgroundColor = settings.isDarkMode ?
        Colors.PurpleSky
      :
        Colors.LightningOrange;

      cardTextColor = settings.isDarkMode ?
        Colors.White
      :
        Colors.Black;

      androidHeaderColor = Colors.PurpleSky;

      break;
    case 'Hera':
      headerRightColor = Platform.OS === 'ios' ?
        settings.isDarkMode ?
          Colors.PowerPurple
        :
          Colors.Pink
      :
        Colors.PinkPressed;

      cardBackgroundColor = settings.isDarkMode ?
        Colors.FloatingPurple
      :
        Colors.NeutralPink;

      cardTextColor = Colors.White;

      androidHeaderColor = Colors.PurpleThunder;

      break;
    case 'Poseidon':
      headerRightColor = Platform.OS === 'ios' ?
        settings.isDarkMode ?
          Colors.PurpleBlue
        :
          Colors.RiverGreen
      :
        Colors.PurpleBlue;

      cardBackgroundColor = settings.isDarkMode ?
        Colors.LightOcean
      :
        Colors.OceanTide;
      
      cardTextColor = settings.isDarkMode ?
        Colors.White
      :
        Colors.Black;

      androidHeaderColor = Colors.LightOcean;

      break;
    case 'Apollo':
      headerRightColor = Platform.OS === 'ios' ?
        settings.isDarkMode ?
          Colors.Soldier
        :
          Colors.LimeGreen
      :
        Colors.Soldier;

      cardBackgroundColor = Colors.DarkGrayStone;

      cardTextColor = Colors.White;

      androidHeaderColor = Colors.DarkGrayStone;

      break;
    case 'Artemis':
      headerRightColor = Platform.OS === 'ios' ?
        settings.isDarkMode ?
          Colors.ArrowtipSilver
        :
          Colors.NightBlue
      :
        Colors.StoneBlue;

      cardBackgroundColor = settings.isDarkMode ?
        Colors.DeepPurple
      :
        Colors.NightBlue;

      cardTextColor = Colors.White;

      androidHeaderColor = Colors.DeepPurple;

      break;
    case 'Hades':
      headerRightColor = Platform.OS === 'ios' ?
        settings.isDarkMode ?
          Colors.LightMaroon
        :
          Colors.DarkMaroon
      :
        Colors.BlueFire;

      cardBackgroundColor = settings.isDarkMode ?
        Colors.LightMaroon
      :
        Colors.DarkMaroon;  
      
      cardTextColor = Colors.White;

      androidHeaderColor = Colors.MatteBlack;
      
      break;
    default:
      headerRightColor = Colors.CalaGreen;
      cardBackgroundColor = Colors.PurpleFog;
      cardTextColor = Colors.White;
      androidHeaderColor = Colors.PurpleFog;
  }

  useEffect(() => {
    if(deleteTables === true) {
      dispatch(tablesActions.deleteAllTables());
      dispatch(deleteDataActions.setDeleteTablesFalse());
    }

    navigation.setOptions({
      headerTitle: headerTitle,
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={IconHeader}>
          <Item
            title='add-table'
            iconName='add-to-list'
            component='Entypo'
            onPress={() => {
              itemIndex && closeCurrentRow(itemIndex);
              navigation.navigate('CreateTableModal');
            }}
            color={headerRightColor}
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
  });

  useEffect(() => {
    if(settings.sortTablesMode === 'first_created') {
      dispatch(tablesActions.sortByDateFirst());
    }

    if(settings.sortTablesMode === 'last_created') {
      dispatch(tablesActions.sortByDateLast());
    }

    if(settings.sortTablesMode === 'alphabetical_ascending') {
      dispatch(tablesActions.sortByAlphabeticalAscending());
    }

    if(settings.sortTablesMode === 'alphabetical_descending') {
      dispatch(tablesActions.sortByAlphabeticalDescending());
    }
  }, [settings])

  //  These functions are to close the swipeables whenever the user
  //  swipes another item or presses on anywhere else on the screen

  const closePreviousRow = (index) => {
    if(previousOpenedRow && previousOpenedRow !== row[index]) {
      previousOpenedRow.close();
    }
    previousOpenedRow = row[index];
  };

  const closeCurrentRow = (index) => {
    const currentRow = row[index];
    currentRow.close();
  }

  //  -------------------------------------------------------------

  const NoTables = (
    <View 
      style={[
        styles.container,
        {
          backgroundColor: settings.isDarkMode ? Colors.PitchBlack : '#fff',
        }
      ]}
    >
      <Text
        style={{
          color: settings.isDarkMode ? '#fff' : '#000',
        }}
      >
        {noTablesText}
      </Text>
      {
        Platform.OS === 'ios' ?
          <Button
            title={createTableText}
            onPress={() => navigation.navigate('CreateTableModal')}
          />
        :
          <TextButton
            title={createTableText}
            onPress={() => navigation.navigate('CreateTableModal')}
          />
      }
    </View>
  )
  
  const ShowTables = (
    <Pressable
      style={[
        styles.tablesContainer,
        {
          backgroundColor: settings.isDarkMode ? Colors.PitchBlack : '#fff',
        }
      ]}
      onPress={() => {
        itemIndex && (
          closeCurrentRow(itemIndex),
          itemIndex = null
        )
      }}
    >
      <FlatList
        data={tables}
        style={{
          marginTop: 10,
        }}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          return (
            <Swipeable
              ref={ref => row[item.id] = ref}
              renderLeftActions={(progress, dragX) => {
                const scale = dragX.interpolate({
                  inputRange: [0, 100],
                  outputRange: [0, 1],
                  extrapolate: 'clamp'
                })
            
                return (
                  <Pressable
                    style={styles.leftAction}
                    onPress={() => {
                      navigation.navigate('RenameTableModal', {
                        tableId: item.id
                      });
                      closeCurrentRow(item.id);
                    }}
                  >
                    <Animated.Text
                      style={[
                        styles.leftActionText,
                        {
                          transform: [{ scale }],
                          backgroundColor: settings.isDarkMode ?
                              Colors.PitchBlack
                            : 
                              '#fff',
                          color: settings.isDarkMode ?
                              Colors.SkyBlue
                            :
                              'blue',
                          fontSize: settings.language === 'Español' ? 24 : 28,
                        }
                      ]}
                    >
                      {editText}
                    </Animated.Text>
                  </Pressable>
                )
              }}
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
                        deleteTableTitle,
                        deleteTableMessage,
                        [
                          {
                            text: yesText,
                            onPress: () => dispatch(tablesActions.deleteTable(item.id))
                          },
                          {
                            text: noText,
                            onPress: () => {
                              closeCurrentRow(item.id);
                            }
                          }
                        ]
                      )
                    }}
                  >
                    <Animated.Text
                      style={[
                        styles.rightActionText,
                        {
                          transform: [{ scale }],
                          backgroundColor: settings.isDarkMode ?
                              Colors.PitchBlack
                            : 
                              '#fff',
                          fontSize: settings.language === 'Español' ? 23 : 22
                        }
                      ]}
                    >
                      {deleteText}
                    </Animated.Text>
                  </Pressable>
                )
              }}
              onSwipeableWillOpen={() => {
                itemIndex = item.id;
                closePreviousRow(item.id);
              }}
            >
              <Pressable
                onPress={() => {
                  if(itemIndex) {
                    closePreviousRow(item.id);
                    return itemIndex = null;
                  }
                  return (
                    navigation.navigate('DataTable', {
                      tableId: item.id,
                      tableName: item.name,
                      columns: item.columns,
                      tableIndex: item.tableIndex,
                    })
                  )
                }}
                style={{
                  width: screenWidth / 1.1,
                }}
              >
                <Card
                  style={[
                    {
                      height: screenHeight / 5.15,
                      marginTop: 12,
                      marginBottom: 12,
                      backgroundColor: cardBackgroundColor,
                    }
                  ]}
                >
                  <Card.Content>
                    <Title style={{ color: cardTextColor }}>{item.name}</Title>
                    <Paragraph style={{ color: cardTextColor }}>{item.description}</Paragraph>
                  </Card.Content>
                </Card>
              </Pressable>
            </Swipeable>
          )
        }}
      />
    </Pressable>
  )

  return tables.length > 0 ? ShowTables : NoTables
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    backgroundColor: Colors.PurpleFog,
    color: '#fff',
  },
  floatingActionButton: {
    position: 'absolute',
    bottom: 35,
    right: 30
  },
  leftAction: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: '0%',
  },
  rightAction: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginTop: '0%',
  },
  tablesContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  leftActionText: {
    fontWeight: '600',
    paddingLeft: 0,
    paddingRight: 20,
    fontSize: 28,
  },
  rightActionText: {
    color: 'red',
    fontWeight: '600',
    paddingLeft: 20,
    paddingRight: 0,
    fontSize: 22,
  },
})

export default ViewTablesScreen;
