import { StatusBar } from 'expo-status-bar';
import React, { useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MovieGallery from './components/MovieGallery'

export default function App() {
  return (
    <View style={styles.container}>
      <MovieGallery />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
   marginTop: 0,
  },
});
