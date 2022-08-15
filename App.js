import {StatusBar} from 'expo-status-bar'
import * as React from 'react';
import { TouchableOpacity, View, Text, Image,StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Camera from './screen/Camera';


function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgb(238, 214, 211)' }}>
      <Text style={styles.heading}>Snapper</Text>
      <Image  
      style={styles.logo}
      source={require('./assets/logo.png')} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Camera')}>
          <Text styles={styles.text}>Take a picture</Text>
      </TouchableOpacity>
     <StatusBar style="auto" />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}
           options={{
            headerShown: false,
          }} 
          />
        <Stack.Screen name="Camera" component={Camera}
        options={{
          headerShown: false,
        }}
         />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 50,
    padding: 20,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(233, 137, 128)',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    width: 150,
    height: 50,
  },
  heading: {
    fontSize: 50,
    color: 'rgb(130, 29, 48)',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
