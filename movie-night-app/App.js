import { StatusBar } from 'expo-status-bar';
import React, { useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MovieGallery from './components/MovieGallery';
import MatchedAlert from './components/MatchedAlert';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <MovieGallery /> */}
      <MatchedAlert movie={{title: "toy story", overview: "this is a description", year: 2000}} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
   marginTop: 0,
  },
});
