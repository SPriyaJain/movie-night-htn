import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MovieCard from './components/MovieCard';

export default function App() {
  return (
    <View style={styles.container}>
      <MovieCard 
        title="Up"
        year="2009"
        summary="Lots and lots and lots and lots and lots and lots and lots and lots and lots and lots and lots of balloons."
        photo='https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Up_%282009_film%29.jpg/220px-Up_%282009_film%29.jpg'
        genres={["Cartoon", "Adventure"]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
   marginTop: 100,
  },
});
