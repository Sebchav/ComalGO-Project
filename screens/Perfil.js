import React, {useState, useEffect, useContext} from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderPerfil from '../components/HeaderPerfil';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppContext from "../context/app/appContext";

const Perfil = () => {

  const { setLogeado, usuarioActual, setUsuarioActual } = useContext(AppContext);

  const [username, setUsername] = useState('');
  const [correo, setCorreo] = useState('');

  useEffect(() => {
    console.log('usuarioActual en Perfil:', usuarioActual);
    obtenerCorreo();
  }, [usuarioActual]);

  // const obtenerUsernameDesdeAsyncStorage = async () => {
  //   try {
  //     const usernameStored = await AsyncStorage.getItem('username');
  //     setUsername(usernameStored || '');
  //   } catch (error) {
  //     console.error('Error al obtener el username desde AsyncStorage:', error.message);
  //   }
  // };

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

  const navigation = useNavigation();

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

  return (
    <View style={styles.contenedorPrincipal}>
      <HeaderPerfil texto={"Mi Perfil"} mostrarFlecha={false} />
      <Image
        style={styles.icono}
        source={require("../assets/iconoPerfil.png")}
      />
      <View style={styles.contenedor}>
        <Text style={styles.titulo}> Información del perfil</Text>
        <Text style={[styles.texto, styles.info]}> Nombre Usuario: {username}</Text>
        <Text style={[styles.texto, styles.info]}> Correo: {correo}</Text>

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

        <Text style={styles.titulo}> Métodos de pago</Text>
        
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

        {/* <Text style={styles.titulo}> Preferencias</Text>
        <View style={styles.containerClickableText}>
          <View style={styles.containerClickableTextIcon}>
            <Image source={require("../assets/iconoModoOscuroOutlined.png")} />
            <Text style={styles.texto}> Modo oscuro</Text>
          </View>
          <Image source={require("../assets/flechaDerecha.png")} />
        </View> */}

        <TouchableOpacity style={[styles.containerClickableText, styles.marginTop]}
          onPress={()=> cerrarSesion()}
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

const styles = StyleSheet.create({
  titulo: {
    fontWeight: "bold",
    fontSize: 18,
  },
  texto : {
    fontSize: 18,
  },
  contenedor: {
    marginHorizontal: "4%",
    // backgroundColor: "pink",
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
  marginTop : {
    marginTop: 210,
    marginLeft: 4
  },
  info: {
    
  }
});

export default Perfil;
