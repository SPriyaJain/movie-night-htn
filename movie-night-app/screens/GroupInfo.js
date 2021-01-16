import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


export default function GroupInfo({navigation}) {
    return (
      <View style={styles.container}>
        <TextInput mode={"outlined"} placeholder={"Input your group code"} style={styles.input}>
        </TextInput>
        <Button style={styles.submit} dark={true} uppercase={true} mode="contained" onPress={() => navigation.navigate('MovieCard')}>
          Submit
        </Button>
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    maxHeight: 24,
    marginBottom: 120,
  },
  submit: {
    backgroundColor: "#7B59D9",
    width: 120,
    height: 44,
    justifyContent: "center",
  },
});
