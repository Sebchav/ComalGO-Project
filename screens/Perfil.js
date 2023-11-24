import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderPerfil from '../components/HeaderPerfil';
import { useNavigation } from "@react-navigation/native";

const Perfil = () => {

  const navigation = useNavigation();

  return (
    <View style={styles.contenedorPrincipal}>
      <HeaderPerfil texto={"Mi Perfil"}/>
      <Image style={styles.icono} source={require("../assets/iconoPerfil.png")}/>
      <View style={styles.contenedor}>
        <Text style={styles.titulo}> Información del perfil</Text>
        <Text> Nombre Usuario </Text>
        <Text> Correo usuario</Text>
        <TouchableOpacity
          onPress={()=> navigation.navigate("EditarPerfil")}
        >
          <Text> Editar perfil</Text>
        </TouchableOpacity>
        <Text style={styles.titulo}> Métodos de pago</Text>

        <TouchableOpacity
          onPress={()=> navigation.navigate("MisTarjetas")}
        >
          <Text> Mis tarjetas</Text>
        </TouchableOpacity>
        <Text style={styles.titulo}> Preferencias</Text>
        <Text> Modo oscuro</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titulo: {
    fontWeight: "bold",
    fontSize: 18,
  },
  contenedor: {
    marginHorizontal: "4%",
    backgroundColor: "pink",
    gap: 15,
  },
  icono: {
    position: "absolute",
    top: 100,
    left: 115,
    height: 160,
    width:160,
  }
});

export default Perfil;
