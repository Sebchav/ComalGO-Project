import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Componente funcional HeaderPerfil que representa el encabezado de la pantalla de perfil
const HeaderPerfil = ({ texto, mostrarFlecha }) => {
  // Obteniendo la referencia de navegación
  const navigation = useNavigation();

  return (
    // Contenedor principal del encabezado
    <View style={styles.contenedor}>
      {/* Barra de estado */}
      <StatusBar
        backgroundColor="#35253A"
        barStyle="light-content"
      />

      {/* Contenedor de flecha y título */}
      <View style={styles.contenedorFlecha}>
        {mostrarFlecha ? (
          // Botón de flecha para retroceder si mostrarFlecha es verdadero
          <TouchableOpacity
            onPress={() => navigation.navigate("Perfil")}
          >
            <Image style={styles.flecha} source={require("../assets/arrow-left.png")} />
          </TouchableOpacity>
        ) : (
          // Espacio en blanco si mostrarFlecha es falso
          <View></View>
        )}

        {/* Título del encabezado */}
        <Text style={[styles.titulo, mostrarFlecha === false ? styles.tituloMargin : ""]}>{texto}</Text>

        {/* Espacio en blanco */}
        <View></View>
      </View>
    </View>
  );
};

// Estilos del componente HeaderPerfil
const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#35253A',
    height: 200,
    position: 'relative',
    marginBottom: 80,
  },
  contenedorFlecha: {
    marginTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    justifyContent: 'space-between',
  },
  titulo: {
    color: 'white',
    fontSize: 20,
    marginRight: 40,
  },
  tituloMargin: {
    marginRight: 4,
    marginTop: 7,
  },
});

// Exportar el componente HeaderPerfil como componente predeterminado
export default HeaderPerfil;
