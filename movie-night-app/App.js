import { StatusBar } from 'expo-status-bar';
import React, { useRef } from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import { IconButton, Colors } from 'react-native-paper';
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
      <MovieGallery uid="1" />
      <MatchedAlert hideModalCallback={hideModal} visible={visible} movie={{title: "toy story", overview: "this is a description", year: 2000}} />
    </View>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="GroupsInfo">
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
