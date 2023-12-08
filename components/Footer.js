import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppContext from '../context/app/appContext';

// Componente funcional Footer que representa la barra de navegación inferior
const Footer = () => {
  // Obteniendo variables y funciones del contexto de la aplicación
  const { logeado, pantallaActual, setPantallaActual } = useContext(AppContext);

  // Obteniendo la referencia de navegación
  const navigation = useNavigation();

  // Si el usuario no está logeado, no se muestra el componente Footer
  if (!logeado) {
    return null;
  }

  return (
    // Contenedor principal del Footer
    <View style={styles.contenedorFooter}>
      {/* Botón de Categorías */}
      <Pressable
        onPress={() => {
          navigation.navigate('Categorias');
          setPantallaActual('Categorias');
        }}
      >
        <Image
          style={styles.img}
          source={
            pantallaActual === 'Categorias'
              ? require('../assets/iconoNavSeleccion1.png')
              : require('../assets/iconoNav1.png')
          }
        />
      </Pressable>

      {/* Botón de Orden */}
      <Pressable
        onPress={() => {
          navigation.navigate('Orden');
          setPantallaActual('Orden');
        }}
      >
        <Image
          style={styles.img}
          source={
            pantallaActual === 'Orden'
              ? require('../assets/iconoNavSeleccion2.png')
              : require('../assets/iconoNav2.png')
          }
        />
      </Pressable>

      {/* Botón de Estado */}
      <Pressable
        onPress={() => {
          navigation.navigate('Status');
          setPantallaActual('Status');
        }}
      >
        <Image
          style={styles.img}
          source={
            pantallaActual === 'Status'
              ? require('../assets/iconoNavSeleccion3.png')
              : require('../assets/iconoNav3.png')
          }
        />
      </Pressable>

      {/* Botón de Perfil */}
      <Pressable
        onPress={() => {
          navigation.navigate('Perfil');
          setPantallaActual('Perfil');
        }}
      >
        <Image
          style={styles.img}
          source={
            pantallaActual === 'Perfil'
              ? require('../assets/iconoNavSeleccion4.png')
              : require('../assets/iconoNav4.png')
          }
        />
      </Pressable>
    </View>
  );
};

// Estilos del componente Footer
const styles = StyleSheet.create({
  contenedorFooter: {
    backgroundColor: '#35253A',
    paddingHorizontal: 30,
    paddingVertical: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  img: {
    width: 33,
    height: 33,
    resizeMode: 'contain',
  },
});

// Exportar el componente Footer como componente predeterminado
export default Footer;
