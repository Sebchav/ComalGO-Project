import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Perfil = () => {
  return (
    <SafeAreaView>
      <View style={styles.contenedor}>
        <Text style={styles.titulo}> Información del perfil</Text>
        <Text> Nombre Usuario </Text>
        <Text> Correo usuario</Text>
        <Text> Editar perfil</Text>
        <Text style={styles.titulo}> Métodos de pago</Text>
        <Text> Mis tarjetas</Text>
        <Text style={styles.titulo}> Preferencias</Text>
        <Text> Modo oscuro</Text>
      </View>
    </SafeAreaView>
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
});

export default Perfil;
