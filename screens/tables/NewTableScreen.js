import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  useWindowDimensions,
  ScrollView,
  // TextInput
} from 'react-native';
import { TextInput } from 'react-native-paper';

const NewTableScreen = ({ navigation }) => {
  const [tableName, setTableName] = useState('');
  const [tableDescription, setTableDescription] = useState('');
  const windowWidth = useWindowDimensions().width;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Table Screen</Text>
      <TextInput
        value={tableName}
        onChangeText={setTableName}
        style={styles.vertical}
        label='Table Name'
      />
      <TextInput
        value={tableDescription}
        onChangeText={setTableDescription}
        placeholder='Optional'
        style={styles.vertical}
        label='Description'
      />
      <Text style={styles.columnsText}>Columns: </Text>
      <ScrollView
        style={[
          styles.columnsList,
          {
            width: windowWidth / 1.05,
          }
        ]}
      >
        <Text>Lorem Ipsum</Text>
        <Text>Lorem Ipsum</Text>
        <Text>Lorem Ipsum</Text>
        <Text>Lorem Ipsum</Text>
        <Text>Lorem Ipsum</Text>
        <Text>Lorem Ipsum</Text>
        <Text>Lorem Ipsum</Text>
        <Text>Lorem Ipsum</Text>
        <Text>Lorem Ipsum</Text>
        <Text>Lorem Ipsum</Text>
        <Text>Lorem Ipsum</Text>
        <Text>Lorem Ipsum</Text>
        <Text>Lorem Ipsum</Text>
        <Text>Lorem Ipsum</Text>
        <Text>Lorem Ipsum</Text>
        <Text>Lorem Ipsum</Text>
        <Text>Lorem Ipsum</Text>
        <Text>Lorem Ipsum</Text>
        <Text>Lorem Ipsum</Text>
        <Text>Lorem Ipsum</Text>
        <Text>Lorem Ipsum</Text>
        <Text>Lorem Ipsum</Text>
        <Text>Lorem Ipsum</Text>
        <Text>Lorem Ipsum</Text>
        <Text>Lorem Ipsum</Text>
        <Text>Lorem Ipsum</Text>
        <Text>Lorem Ipsum</Text>
        <Text>Lorem Ipsum</Text>
        <Text>Lorem Ipsum</Text>
        <Text>Lorem Ipsum</Text>
        <Text>Lorem Ipsum</Text>
        <Text>Lorem Ipsum</Text>
        <Text>Lorem Ipsum</Text>
        <Text>Lorem Ipsum</Text>
        <Text>Lorem Ipsum</Text>
        <Text>Lorem Ipsum</Text>
        <Text>Lorem Ipsum</Text>
        <Text>Lorem Ipsum</Text>
        <Text>Lorem Ipsum</Text>
        <Text>Lorem Ipsum</Text>
        <Text>Lorem Ipsum</Text>
        <Text>Lorem Ipsum</Text>
        <Text>Lorem Ipsum</Text>
        <Text>Lorem Ipsum</Text>
        <Text>Lorem Ipsum</Text>
      </ScrollView>
      <Button
        title='New Column'
        onPress={() => console.log('you added a button')}
      />
      <Button
        title='Delete Column'
        onPress={() => console.log('you deleted a column')}
      />
      <Button
        title='Close'
        onPress={() => navigation.goBack()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    borderColor: 'black',
    borderWidth: 4,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 100,
    marginBottom: 15
  },
  formContainer: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 4,
    // marginTop: 50,
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
  columnsList: {
    borderColor: 'black',
    borderWidth: 2,
  },
  buttonContainer: {
    backgroundColor: 'yellow',
  },
  vertical: {
    marginTop: 25,
    marginBottom: 20
  }
})

export default NewTableScreen;
