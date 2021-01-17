import React, { useState } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MatchCard from '../components/MatchCard';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
    }
  });

const mockMatches = [
    {
        "name" : "Up",
        "friends": "Priya and Victor",
        "poster_path": 'https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Up_%282009_film%29.jpg/220px-Up_%282009_film%29.jpg',
    },
    {
        "name": "Inception",
        "friends": "Bob",
        "poster_path": 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg',
    },
]

  
export default function MatchList({navigation}) {
  const [test, setTest] = useState("press to make");

  
const renderCard = (item) => {
    item = item.item
    return(
    <MatchCard name={item.name} friends={item.friends} poster_path={item.poster_path}></MatchCard>)
}

  return (
      <SafeAreaView style={styles.container} >
        <FlatList data={mockMatches} 
        renderItem={renderCard} 
        keyExtractor={item => item.name}/>
      </SafeAreaView>

  );
}

