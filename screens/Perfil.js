import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderPerfil from '../components/HeaderPerfil';
import { useNavigation } from "@react-navigation/native";

const Perfil = () => {

  const navigation = useNavigation();

  return (
    <View style={styles.contenedorPrincipal}>
      <HeaderPerfil texto={"Mi Perfil"} />
      <Image
        style={styles.icono}
        source={require("../assets/iconoPerfil.png")}
      />
      <View style={styles.contenedor}>
        <Text style={styles.titulo}> Información del perfil</Text>
        <Text style={styles.texto}> Nombre Usuario </Text>
        <Text style={styles.texto}> Correo usuario</Text>

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

        <Text style={styles.titulo}> Preferencias</Text>
        <View style={styles.containerClickableText}>
          <View style={styles.containerClickableTextIcon}>
            <Image source={require("../assets/iconoModoOscuroOutlined.png")} />
            <Text style={styles.texto}> Modo oscuro</Text>
          </View>
          <Image source={require("../assets/flechaDerecha.png")} />
        </View>
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
    fontSize: 16,
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
    gap: 5
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
