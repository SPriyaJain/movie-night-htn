import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


export default function GroupInfo({navigation}) {
  const [test, setTest] = useState("press to make");

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>join a group</Text>
        <TextInput mode={"outlined"} style={styles.input} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>make a group</Text>
        <TouchableOpacity onPress={() => setTest("4X3D")}>
          <TextInput mode={"outlined"} placeholder={test} style={styles.input} />
        </TouchableOpacity>
      </View>
      <Button style={styles.submit} labelStyle={styles.submitLabel} dark={true} uppercase={true} mode="contained" onPress={() => navigation.navigate('MovieCard')}>
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
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontFamily: "serif",
    marginBottom: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    maxHeight: 24,
    minWidth: 300,
    marginBottom: 120,
    color: "purple",
  },
  submit: {
    backgroundColor: "#7B59D9",
    width: 120,
    height: 60,
    justifyContent: "center",
  },
  submitLabel: {
    fontSize: 18,
  },
});
