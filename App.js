import {StatusBar} from 'expo-status-bar'
import * as React from 'react';
import { TouchableOpacity, View, Text, Image,StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Gallery from './screens/Gallery';
import Camera from './screens/Camera';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>App Name</Text>
      <Image  
      style={styles.logo}
      source={require('./assets/icon.png')} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Gallery')}><Text>Gallery</Text></TouchableOpacity>
      <TouchableOpacity
      style={styles.button}
        onPress={() => navigation.navigate('Camera')}><Text>Camera</Text></TouchableOpacity>
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
          }} />
        <Stack.Screen name="Gallery" component={Gallery} />
        <Stack.Screen name="Camera" component={Camera} />
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
    backgroundColor: '#DDDDDD',
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
});
