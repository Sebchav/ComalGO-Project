// Importación de módulos y componentes de React y React Native
import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Importación del componente HeaderPerfil desde la ruta especificada
import HeaderPerfil from '../components/HeaderPerfil';

// Importación del hook useNavigation de '@react-navigation/native' para acceder a la navegación
import { useNavigation } from "@react-navigation/native";

// Importación del módulo AsyncStorage de '@react-native-async-storage/async-storage' para almacenamiento local
import AsyncStorage from '@react-native-async-storage/async-storage';

// Importación del contexto AppContext desde la ruta especificada
import AppContext from "../context/app/appContext";

// Componente funcional Perfil
const Perfil = () => {
  // Contexto de la aplicación
  const { setLogeado, usuarioActual, setUsuarioActual } = useContext(AppContext);

  // Estados locales
  const [username, setUsername] = useState('');
  const [correo, setCorreo] = useState('');

  // Efecto secundario para actualizar la información del perfil
  useEffect(() => {
    obtenerCorreo();
  }, [usuarioActual]);

  // Función para obtener el correo del usuario
  const obtenerCorreo = async () => {
    try {
      // Obtener el correo desde AsyncStorage (si es necesario)
      const usernameCorreo = await AsyncStorage.getItem('correo');
      setCorreo(usernameCorreo || '');

      // Obtener el nombre de usuario desde el estado global (usuarioActual)
      setUsername(usuarioActual.username);
    } catch (error) {
      console.error('Error al obtener datos en el perfil:', error.message);
    }
  };

  // Objeto de navegación
  const navigation = useNavigation();

  // Función para cerrar sesión
  const cerrarSesion = async () => {
    try {
      // Eliminar los valores de AsyncStorage
      await AsyncStorage.removeItem('id');
      await AsyncStorage.removeItem('correo');
      await AsyncStorage.removeItem('username');
      await AsyncStorage.removeItem('contraseña');

      setUsuarioActual({
        ...usuarioActual,
        username: usuarioActual.nuevaUsername, 
      });

      // Redirigir a la pantalla de registro
      setLogeado(false);
      navigation.navigate('Registro');
    } catch (error) {
      console.error('Error al cerrar sesión:', error.message);
    }
  };

  // Renderizado del componente
  return (
    <View style={styles.contenedorPrincipal}>
      {/* Encabezado del perfil */}
      <HeaderPerfil texto={"Mi Perfil"} mostrarFlecha={false} />

      {/* Imagen del perfil */}
      <Image
        style={styles.icono}
        source={require("../assets/iconoPerfil.png")}
      />

      {/* Contenedor principal del perfil */}
      <View style={styles.contenedor}>
        {/* Información del perfil */}
        <Text style={styles.titulo}> Información del perfil</Text>
        <Text style={[styles.texto, styles.info]}> Nombre Usuario: {username}</Text>
        <Text style={[styles.texto, styles.info]}> Correo: {correo}</Text>

        {/* Botón para editar el perfil */}
        <TouchableOpacity
          onPress={() => navigation.navigate("EditarPerfil")}
        >
          <View style={styles.containerClickableText}>
            <View style={styles.containerClickableTextIcon}>
              <Image source={require("../assets/iconoLapizOutlined.png")} />
              <Text style={styles.texto}> Editar Perfil</Text>
            </View>
            <Image source={require("../assets/flechaDerecha.png")} />
          </View>
        </TouchableOpacity>

        {/* Información de métodos de pago */}
        <Text style={styles.titulo}> Métodos de pago</Text>

        {/* Botón para ver las tarjetas */}
        <TouchableOpacity
          onPress={() => navigation.navigate("MisTarjetas")}
        >
          <View style={styles.containerClickableText}>
            <View style={styles.containerClickableTextIcon}>
              <Image source={require("../assets/iconoTarjetaOutlined.png")} />
              <Text style={styles.texto}> Mis tarjetas</Text>
            </View>
            <Image source={require("../assets/flechaDerecha.png")} />
          </View>
        </TouchableOpacity>

        {/* Botón para cerrar sesión */}
        <TouchableOpacity
          style={[styles.containerClickableText, styles.marginTop]}
          onPress={() => cerrarSesion()}
        >
          <View style={styles.containerClickableTextIcon}>
            <Text style={styles.texto}>Cerrar Sesión</Text>
          </View>
          <Image style={styles.exit}  source={require("../assets/exit.png")} />
        </TouchableOpacity>

      </View>
    </View>
  );
};

// Estilos del componente
const styles = StyleSheet.create({
  titulo: {
    fontWeight: "bold",
    fontSize: 18,
  },
  texto: {
    fontSize: 18,
  },
  contenedor: {
    marginHorizontal: "4%",
    gap: 15,
  },
  containerClickableText: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  containerClickableTextIcon: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center"
  },
  icono: {
    position: "absolute",
    top: 100,
    left: 115,
    height: 160,
    width:160,
  },
  marginTop: {
    marginTop: 210,
    marginLeft: 4
  },
  info: {},
  exit: {
    width: 20,
    height: 20
  }
});

// Exportación del componente Perfil
export default Perfil;
