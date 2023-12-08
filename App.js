// Importa los módulos necesarios de React y React Native
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Importa los componentes de las pantallas desde las rutas relativas
import PantallaInicial from "./screens/PantallaInicial";
import InicioSesion from "./screens/InicioSesion";
import Registro from "./screens/Registro";
import Categorias from "./screens/Categorias";
import Orden from "./screens/Orden";
import Status from "./screens/Status";
import Perfil from "./screens/Perfil";

// Importa el componente Footer desde la ruta relativa
import Footer from "./components/Footer";
import MisTarjetas from "./screens/MisTarjetas";
import EditarPerfil from "./screens/EditarPerfil";

// Importa el componente AppState desde la ruta relativa
import AppState from "./context/app/appState";

// Importa el componente ToastProvider desde la biblioteca react-native-toast-notifications
import { ToastProvider } from "react-native-toast-notifications";

// Crea un objeto de navegación nativo
const Stack = createNativeStackNavigator();

// Función que define la estructura de la navegación de la aplicación
function MyStack() {
  return (
    <Stack.Navigator>
      {/* Configuración de la pantalla inicial */}
      <Stack.Screen
        name="PantallaInicial"
        component={PantallaInicial}
        options={{ headerShown: false }}
      />

      {/* Configuración de la pantalla de registro */}
      <Stack.Screen
        name="Registro"
        component={Registro}
        options={{ headerShown: false }}
      />

      {/* Configuración de la pantalla de inicio de sesión */}
      <Stack.Screen
        name="InicioSesion"
        component={InicioSesion}
        options={{ headerShown: false }}
      />

      {/* Configuración de la pantalla de categorías */}
      <Stack.Screen
        name="Categorias"
        component={Categorias}
        options={{ headerShown: false }}
      />

      {/* Configuración de la pantalla de perfil */}
      <Stack.Screen
        name="Perfil"
        component={Perfil}
        options={{ headerShown: false }}
      />

      {/* Configuración de la pantalla de mis tarjetas */}
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

      {/* Configuración de la pantalla de edición de perfil */}
      <Stack.Screen
        name="EditarPerfil"
        component={EditarPerfil}
        options={{ headerShown: false }}
      />

      {/* Configuración de la pantalla de orden */}
      <Stack.Screen name="Orden" component={Orden} />

      {/* Configuración de la pantalla de estado */}
      <Stack.Screen
        name="Status"
        options={{ headerShown: false }}
        component={Status}
      />
    </Stack.Navigator>
  );
}

// Componente principal de la aplicación
export default function App() {
  return (
    // Proveedor de Toast para manejar notificaciones
    <ToastProvider
      style={{ marginTop: 50, width: "100%", marginHorizontal: "0", borderRadius: 16 }}
      textStyle={{ textAlign: "center", marginHorizontal: 80, color: "#FFF", fontWeight: "bold", fontSize: 18 }}
      successColor="#77C380"
    >
      {/* Proveedor de estado de la aplicación */}
      <AppState>
        {/* Contenedor de navegación de la aplicación */}
        <NavigationContainer>
          <MyStack />
          {/* Barra de estado */}
          <StatusBar
            backgroundColor="white"
            barStyle="dark-content"
          />
          {/* Componente de pie de página */}
          <Footer />
        </NavigationContainer>
      </AppState>
    </ToastProvider>
  );
}

// Estilos globales de la aplicación
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
