import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';

import PantallaInicial from './screens/PantallaInicial';
import InicioSesion from './screens/InicioSesion';
import Registro from './screens/Registro';
import Categorias from './screens/Categorias';
import Orden from './screens/Orden';
import Status from './screens/Status';
import Perfil from './screens/Perfil';

import Footer from './components/Footer';

const Stack = createNativeStackNavigator();


function MyStack(){
  return (
    <Stack.Navigator>
      <Stack.Screen name="Categorias" component={Categorias} options={{headerShown: false}}/>
      <Stack.Screen name="PantallaInicial" component={PantallaInicial} options={{headerShown: false}}/>
      <Stack.Screen name="Registro" component={Registro} options={{headerShown: false}}/>
      <Stack.Screen name="InicioSesion" component={InicioSesion} options={{headerShown: false}}/>
      {/* <Stack.Screen name="Categorias" component={Categorias} options={{headerShown: false}}/> */}
      <Stack.Screen name="Orden" component={Orden} options={{headerShown: false}}/>
      <Stack.Screen name="Status" component={Status} options={{headerShown: false}}/>
      <Stack.Screen name="Perfil" component={Perfil} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}

export default function App() {

  return (
    <NavigationContainer>
      <MyStack />
      <Footer />
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
