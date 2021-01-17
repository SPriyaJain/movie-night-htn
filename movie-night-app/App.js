import { StatusBar } from 'expo-status-bar';
import React, { useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MovieCard from './components/MovieCard';
import GroupInfo from './screens/GroupInfo';
import MovieGallery from './components/MovieGallery';
import MatchedAlert from './components/MatchedAlert';

function MovieCardTest() {
  const [visible, setVisible] = React.useState(true)
  const hideModal = () => {
    setVisible(false);
    console.log("HIDE");
  }
  return (
    <View style={styles.container}>
      <MovieCard
        title="Up"
        year="2009"
        summary="Lots and lots and lots and lots and lots and lots and lots and lots and lots and lots and lots of balloons."
        photo='https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Up_%282009_film%29.jpg/220px-Up_%282009_film%29.jpg'
        genres={["Cartoon", "Adventure"]}
      />
      <MovieGallery />
      <MatchedAlert hideModalCallback={hideModal} visible={visible} movie={{title: "toy story", overview: "this is a description", year: 2000}} />
    </View>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="GroupInfo">
        <Stack.Screen name="GroupInfo" component={GroupInfo} />
        <Stack.Screen name="MovieCard" component={MovieCardTest}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Stack = createStackNavigator();

const styles = StyleSheet.create({
  container: {
   marginTop: 0,
  },
});
