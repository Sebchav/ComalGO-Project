import React, {useEffect} from "react"
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PantallaInicial from "./screens/PantallaInicial";
import InicioSesion from "./screens/InicioSesion";
import Registro from "./screens/Registro";
import Categorias from "./screens/Categorias";
import Orden from "./screens/Orden";
import Status from "./screens/Status";
import Perfil from "./screens/Perfil";

import Footer from "./components/Footer";
import MisTarjetas from "./screens/MisTarjetas";
import EditarPerfil from "./screens/EditarPerfil";
import AppState from "./context/app/appState";
import { ToastProvider } from "react-native-toast-notifications";

const Stack = createNativeStackNavigator();
function MyStack() {
  return (
    
    <Stack.Navigator>
      <Stack.Screen
        name="PantallaInicial"
        component={PantallaInicial}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Registro"
        component={Registro}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="InicioSesion"
        component={InicioSesion}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Categorias"
        component={Categorias}
        options={{ headerShown: false }}
      />
      
      {/* <Stack.Screen name="Categorias" component={Categorias} options={{headerShown: false}}/> */}

      <Stack.Screen
        name="Perfil"
        component={Perfil}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="MisTarjetas"
        component={MisTarjetas}
        options={{
          title: "Mis Tarjetas",
          headerTitleAlign: 'center',
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "#35253A"
          },
          
        }}
      />

      <Stack.Screen name="EditarPerfil" component={EditarPerfil} options={{ headerShown: false }}/>
      {/* La pantalla de orden y status SI llevan headerShown */}
      <Stack.Screen name="Orden"  component={Orden} />
      <Stack.Screen name="Status"  options={{ headerShown: false }} component={Status} />

    </Stack.Navigator>
  
  );
}

export default function App() {

  return (
    <ToastProvider
      style={{marginTop: 50, width: "100%", marginHorizontal: "0", borderRadius: 16}}
      textStyle={{textAlign: "center", marginHorizontal: 80, color: "#FFF", fontWeight: "bold", fontSize: 18}}
      successColor="#77C380"
    >
    <AppState>
    <NavigationContainer>
      <MyStack />
      <StatusBar
           backgroundColor="white"
           barStyle="dark-content"
      />
      <Footer />
    </NavigationContainer>
    </AppState>
    </ToastProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
