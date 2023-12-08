import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Componente funcional BtnCategoria que recibe las propiedades nombreCategoria, onPress y categoriaSeleccionada
const BtnCategoria = ({ nombreCategoria, onPress, categoriaSeleccionada }) => {
  // Estilo condicional para determinar el color de fondo del botón basado en si la categoría está seleccionada o no
  const estiloBoton = {
    ...styles.contenedorCategoria,
    backgroundColor: categoriaSeleccionada === nombreCategoria ? "#c79c63" : "#E0B071",
  };

  // Devuelve un componente TouchableOpacity (botón táctil) con el estilo condicional y el texto de la categoría
  return (
    <TouchableOpacity style={estiloBoton} onPress={() => onPress(nombreCategoria)}>
      <Text style={styles.textoCategoria}>{nombreCategoria}</Text>
    </TouchableOpacity>
  );
};

// Estilos para el componente BtnCategoria
const styles = StyleSheet.create({
  contenedorCategoria: {
    backgroundColor: "#E0B071",
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: "50%",
    borderRadius: 6
  },
  textoCategoria: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  }
});

// Exporta el componente BtnCategoria para su uso en otras partes de la aplicación
export default BtnCategoria;
