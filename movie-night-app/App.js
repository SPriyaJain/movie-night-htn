import { StatusBar } from 'expo-status-bar';
import React, { useRef } from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import { IconButton, Colors } from 'react-native-paper';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MovieCard from './components/MovieCard';
import GroupInfo from './screens/GroupInfo';
import MatchList from './screens/MatchList';
import MovieGallery from './components/MovieGallery';
import MatchedAlert from './components/MatchedAlert';


function MovieCardTest() {
  const [visible, setVisible] = React.useState(false)
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
      <Stack.Navigator initialRouteName="Matches">
        <Stack.Screen name="GroupsInfo" component={GroupInfo} 
          options={{
            headerStyle: {
              backgroundColor: '#7B59D9',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerTitle: props => <Image style={styles.logo} source={{uri: 'https://i.imgur.com/VJxRFKi.png'}}/>,
          }}
        />
        <Stack.Screen name="MovieCard" component={MovieCardTest}
          options={{
            headerStyle: {
              backgroundColor: '#7B59D9',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerTitle: props => <Image style={styles.logo} source={{uri: 'https://i.imgur.com/VJxRFKi.png'}}/>,
            headerBackImage: () => <IconButton icon="cog" width={25} height={25} color={Colors.white} style={styles.navButton}/>,
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen name="Matches" component={MatchList}>
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Stack = createStackNavigator();

const styles = StyleSheet.create({
  container: {
   marginTop: 0,
  },
  logo: {
    width: 100,
    height: 30,
  },
  navButton: {
    color: 'white',
  }
});
