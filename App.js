import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PantallaInicial from './screens/PantallaInicial';
import InicioSesion from './screens/InicioSesion';
import Registro from './screens/Registro';

const Stack = createNativeStackNavigator();

function MyStack(){
  return (
    <Stack.Navigator>
      <Stack.Screen name="PantallaInicial" component={PantallaInicial} options={{headerShown: false}}/>
      <Stack.Screen name="Registro" component={Registro} options={{headerShown: false}}/>
      <Stack.Screen name="InicioSesion" component={InicioSesion} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
